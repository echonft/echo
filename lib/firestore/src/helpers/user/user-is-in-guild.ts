import { NftCollectionDiscordGuild, User, UserDiscordGuild } from '@echo/firestore-types'
import propIsNil from '@echo/utils/prop-is-nil'
import { forEach, includes, map, prop } from 'ramda'

export function userIsInGuild(user: Partial<User>, discordGuild: Partial<NftCollectionDiscordGuild>) {
  if (propIsNil('discordId', discordGuild)) {
    throw Error('discord guild does not have a discord id')
  }
  if (propIsNil('discordGuilds', user)) {
    throw Error('user does not have a discord guilds')
  }
  const { discordGuilds } = user
  forEach((discordGuild: UserDiscordGuild) => {
    if (propIsNil('discordId', discordGuild)) {
      throw Error('not every discord guilds have an id')
    }
  }, discordGuilds!)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return includes(discordGuild.discordId, map(prop('discordId'), discordGuilds))
}
