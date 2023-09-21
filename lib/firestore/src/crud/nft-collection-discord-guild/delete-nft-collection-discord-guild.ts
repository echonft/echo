import { getNftCollectionDiscordGuildSnapshotById } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guild-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteNftCollectionDiscordGuild(id: string): Promise<WriteResult> {
  const documentSnapshot = await getNftCollectionDiscordGuildSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`nft collection discord guild with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
