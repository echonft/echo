import { initializeTestFirebase } from '@test-utils/initialize-test-firebase'

export async function tearUpRemoteFirestoreTests() {
  await initializeTestFirebase()
}
