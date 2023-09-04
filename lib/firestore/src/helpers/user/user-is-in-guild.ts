import { NftCollectionDiscordGuild, User } from '@echo/firestore-types'
import { includes, map, prop } from 'ramda'

export const userIsInGuild = (user: User, discordGuild: NftCollectionDiscordGuild) =>
  includes(discordGuild.discordId, map(prop('discordId'), user.discordGuilds))
