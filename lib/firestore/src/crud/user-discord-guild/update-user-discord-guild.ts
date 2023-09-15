import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import { getUserDiscordGuildSnapshotByUserId } from '@echo/firestore/crud/user-discord-guild/get-user-discord-guild-snapshot-by-user-id'
import { cleanAndUpdateDocumentRef } from '@echo/firestore/helpers/crud/clean-and-update-document-ref'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { assoc, isNil } from 'ramda'

export async function updateUserDiscordGuild(userId: string, guilds: { discordId: string }[]): Promise<WriteResult> {
  const documentSnapshot = await getUserDiscordGuildSnapshotByUserId(userId)
  if (isNil(documentSnapshot)) {
    throw Error(`user discord guild with userId ${userId} does not exist`)
  }

  return cleanAndUpdateDocumentRef(
    documentSnapshot.ref,
    assoc('updatedAt', dayjs(), { userId, guilds }),
    userDiscordGuildDataConverter
  )
}
