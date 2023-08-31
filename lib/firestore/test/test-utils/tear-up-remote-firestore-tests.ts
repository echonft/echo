import { initializeFirebase } from '../../src/services/initialize-firebase'

export function tearUpRemoteFirestoreTests() {
  initializeFirebase()
  // await resetDb()
}
