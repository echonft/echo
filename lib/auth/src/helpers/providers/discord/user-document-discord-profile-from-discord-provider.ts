import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { DiscordProfile as ProviderDiscordProfile } from 'next-auth/providers/discord'
import { assoc, pipe } from 'ramda'

export function userDocumentDiscordProfileFromDiscordProvider(
  profile: Partial<ProviderDiscordProfile> & Required<Pick<ProviderDiscordProfile, 'id' | 'username'>>
): UserDocument['discord'] {
  return pipe(userDiscordProfileFromDiscordProvider, assoc('id', profile.id))(profile)
}
