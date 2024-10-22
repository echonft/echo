import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function clearDb() {
  const references = await firestoreApp().listCollections()
  for (const reference of references) {
    await firestoreApp().recursiveDelete(reference)
  }
}
