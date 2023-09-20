import { getDiscordUserSnapshotById } from '@echo/firestore/crud/discord-user/get-discord-user-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteDiscordUser(id: string): Promise<WriteResult> {
  const documentSnapshot = await getDiscordUserSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`discord user with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
