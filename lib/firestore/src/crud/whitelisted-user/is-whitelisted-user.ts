import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function isWhitelistedUser(discordId: string): Promise<boolean> {
  const snapshot = await firestoreApp()
    .collection('whitelisted-users')
    .where('discordId', '==', discordId)
    .limit(1)
    .get()

  return !snapshot.empty
}
