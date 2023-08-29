import { firestore } from './firestore'

export async function terminate() {
  try {
    await firestore().terminate()
  } catch (e) {
    return Promise.resolve()
  }
}
