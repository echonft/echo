import { findUserDiscordGuildByUserId } from '@echo/firestore/crud/user-discord-guild/find-user-discord-guild-by-user-id'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import { includes, isNil, map, prop } from 'ramda'

export async function userIsInGuild(userId: string, discordGuild: Partial<FirestoreNftCollectionDiscordGuild>) {
  const userDiscordGuild = await findUserDiscordGuildByUserId(userId)
  if (isNil(userDiscordGuild)) {
    return false
  }
  const { guilds } = userDiscordGuild
  return includes(discordGuild.discordId, map(prop('discordId'), guilds))
}
