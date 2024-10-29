import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { updateUserRequestSchemaTransform } from '@echo/api/validators/update-user-request-schema'
import { userDocumentDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-document-discord-profile-from-discord-provider'
import type { AuthUser } from '@echo/auth/types/auth-user'
import { fetchDiscordProfile } from '@echo/backend/helpers/user/fetch-discord-profile'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { walletDocumentToModel } from '@echo/firestore/converters/wallet-document-to-model'
import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { NextResponse } from 'next/server'
import { andThen, assoc, map, pipe, prop } from 'ramda'

export async function updateUserRequestHandler(args: RequestHandlerArgs<UpdateUserRequest>) {
  const token = await parseRequest(updateUserRequestSchemaTransform)(args.req)
  const user = await pipe(
    fetchDiscordProfile,
    andThen(pipe(userDocumentDiscordProfileFromDiscordProvider, addOrUpdateUser, andThen(userDocumentToModel)))
  )(token)
  const wallets = await pipe(prop('username'), getWalletsForUser, andThen(map(walletDocumentToModel)))(user)
  return NextResponse.json<AuthUser>(assoc('wallets', wallets, user))
}
