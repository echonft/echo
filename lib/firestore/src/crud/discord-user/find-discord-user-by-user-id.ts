import { getDiscordUserSnapshotByUserId } from '@echo/firestore/crud/discord-user/get-discord-user-snapshot-by-user-id'

export async function findDiscordUserByUserId(userId: string) {
  const documentSnapshot = await getDiscordUserSnapshotByUserId(userId)
  return documentSnapshot?.data()
}
