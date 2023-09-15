import { initializeTestFirebase } from '@test-utils/initialize-test-firebase'

export function tearUpRemoteFirestoreTests() {
  initializeTestFirebase()
  // await resetDb()
}
