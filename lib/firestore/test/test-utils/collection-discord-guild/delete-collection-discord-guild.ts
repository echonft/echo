import { getCollectionDiscordGuildSnapshotById } from '@test-utils/collection-discord-guild/get-collection-discord-guild-snapshot-by-id'
import { type WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteCollectionDiscordGuild(id: string): Promise<WriteResult> {
  const documentSnapshot = await getCollectionDiscordGuildSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`nft collection discord guild with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
