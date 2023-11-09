import { initializeTestFirebase } from '@echo/firestore-test/initialize-test-firebase'

export async function tearUpRemoteFirestoreTests() {
  await initializeTestFirebase()
}
