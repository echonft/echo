import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'

export function tearUpRemoteFirestoreTests() {
  initializeFirebase()
  // await resetDb()
}
