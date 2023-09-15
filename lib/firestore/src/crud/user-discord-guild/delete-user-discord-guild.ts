import { getUserDiscordGuildSnapshotById } from '@echo/firestore/crud/user-discord-guild/get-user-discord-guild-snapshot-by-id'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function deleteUserDiscordGuild(id: string): Promise<WriteResult> {
  const documentSnapshot = await getUserDiscordGuildSnapshotById(id)
  if (isNil(documentSnapshot)) {
    throw Error(`user discord guild with id ${id} does not exist`)
  }
  return documentSnapshot.ref.delete()
}
