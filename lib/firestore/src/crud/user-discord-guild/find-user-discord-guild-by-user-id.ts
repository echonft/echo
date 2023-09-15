import { getUserDiscordGuildSnapshotByUserId } from '@echo/firestore/crud/user-discord-guild/get-user-discord-guild-snapshot-by-user-id'

export async function findUserDiscordGuildByUserId(userId: string) {
  const documentSnapshot = await getUserDiscordGuildSnapshotByUserId(userId)
  return documentSnapshot?.data()
}
