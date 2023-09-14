import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { forEach, includes, map, prop } from 'ramda'

export function userIsInGuild(
  user: Partial<FirestoreUser> & { discordGuilds: FirestoreUserDiscordGuild[] },
  discordGuild: Partial<FirestoreNftCollectionDiscordGuild>
) {
  if (propIsNil('discordId', discordGuild)) {
    throw Error('discord guild does not have a discord id')
  }
  if (propIsNil('discordGuilds', user)) {
    throw Error('user does not have a discord guilds')
  }
  const { discordGuilds } = user
  forEach((discordGuild: FirestoreUserDiscordGuild) => {
    if (propIsNil('discordId', discordGuild)) {
      throw Error('not every discord guilds have an id')
    }
  }, discordGuilds)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return includes(discordGuild.discordId, map(prop('discordId'), discordGuilds))
}
