import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { getCollectionDiscordGuildSnapshotById } from '@echo/firestore-test/collection-discord-guild/get-collection-discord-guild-snapshot-by-id'

export async function findCollectionDiscordGuildById(id: string): Promise<CollectionDiscordGuild | undefined> {
  const querySnapshot = await getCollectionDiscordGuildSnapshotById(id)
  return querySnapshot?.data()
}
