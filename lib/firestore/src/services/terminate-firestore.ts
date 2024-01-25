import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function terminateFirestore(): Promise<void> {
  try {
    await firestoreApp().terminate()
  } catch (e) {
    return Promise.resolve()
  }
}
