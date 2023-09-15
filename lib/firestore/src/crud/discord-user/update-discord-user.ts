import { discordUserDataConverter } from '@echo/firestore/converters/discord-user-data-converter'
import { getDiscordUserSnapshotByUserId } from '@echo/firestore/crud/discord-user/get-discord-user-snapshot-by-user-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { assoc, isNil } from 'ramda'

export async function updateDiscordUser(
  userId: string,
  discordUser: Partial<Omit<FirestoreDiscordUser, 'id' | 'updatedAt'>>
): Promise<WriteResult> {
  const documentSnapshot = await getDiscordUserSnapshotByUserId(userId)
  if (isNil(documentSnapshot)) {
    throw Error(`discord user with userId ${userId} does not exist`)
  }

  return cleanAndUpdateDocumentRef(
    documentSnapshot.ref,
    assoc('updatedAt', dayjs(), discordUser),
    discordUserDataConverter
  )
}
