import { firestore } from './firestore'

export async function terminateFirestore() {
  try {
    await firestore().terminate()
  } catch (e) {
    return Promise.resolve()
  }
}
