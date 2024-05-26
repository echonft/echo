import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

export async function clearDb() {
  initializeFirebase()
  const references = await firestoreApp().listCollections()
  for (const reference of references) {
    await firestoreApp().recursiveDelete(reference)
  }
  await terminateFirestore()
}
