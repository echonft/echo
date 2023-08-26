import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { User } from '../../types/model/user'
import { includes, map, prop } from 'ramda'

export const userIsInGuild = (user: User, discordGuild: NftCollectionDiscordGuild) =>
  includes(discordGuild.discordId, map(prop('discordId'), user.discordGuilds))
