import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function addWhitelistedUser(discordId: string): Promise<void> {
  await firestoreApp().collection('whitelisted-users').doc().set({
    discordId
  })
}
