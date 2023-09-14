import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function terminateFirestore() {
  try {
    await firestoreApp().terminate()
  } catch (e) {
    return Promise.resolve()
  }
}
