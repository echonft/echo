import { getNftCollectionDiscordGuildSnapshotById } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guild-snapshot-by-id'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection-discord-guild'

export async function findNftCollectionDiscordGuildById(
  id: string
): Promise<FirestoreNftCollectionDiscordGuild | undefined> {
  const querySnapshot = await getNftCollectionDiscordGuildSnapshotById(id)
  return querySnapshot?.data()
}
