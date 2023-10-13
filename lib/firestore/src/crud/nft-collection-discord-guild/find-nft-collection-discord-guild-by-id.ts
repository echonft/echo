import { getNftCollectionDiscordGuildSnapshotById } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guild-snapshot-by-id'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'

export async function findNftCollectionDiscordGuildById(id: string): Promise<CollectionDiscordGuild | undefined> {
  const querySnapshot = await getNftCollectionDiscordGuildSnapshotById(id)
  return querySnapshot?.data()
}
