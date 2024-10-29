import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import type { DiscordProfileResponse } from '@echo/auth/types/discord-profile-response'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { assoc, pipe } from 'ramda'

export function userDocumentDiscordProfileFromDiscordProvider(
  response: DiscordProfileResponse
): UserDocument['discord'] {
  return pipe(userDiscordProfileFromDiscordProvider, assoc('id', response.id))(response)
}
