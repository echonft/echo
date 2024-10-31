import { userDiscordProfileFromDiscordProvider } from '@echo/backend/helpers/auth/providers/discord/user-discord-profile-from-discord-provider'
import type { DiscordProfileResponse } from '@echo/backend/types/discord-profile-response'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { assoc, pipe } from 'ramda'

export function userDocumentDiscordProfileFromDiscordProvider(
  response: DiscordProfileResponse
): UserDocument['discord'] {
  return pipe(userDiscordProfileFromDiscordProvider, assoc('id', response.id))(response)
}
