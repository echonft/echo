import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { updateUserRequestSchemaTransform } from '@echo/api/validators/update-user-request-schema'
import { userDocumentDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-document-discord-profile-from-discord-provider'
import { fetchDiscordProfile } from '@echo/backend/helpers/user/fetch-discord-profile'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { andThen, pipe } from 'ramda'

export async function updateUserRequestHandler(args: RequestHandlerArgs<UpdateUserRequest>) {
  const token = await parseRequest(updateUserRequestSchemaTransform)(args.req)
  return pipe(
    fetchDiscordProfile,
    andThen(
      pipe(
        userDocumentDiscordProfileFromDiscordProvider,
        addOrUpdateUser,
        andThen(pipe(userDocumentToModel, toNextReponse))
      )
    )
  )(token)
}
