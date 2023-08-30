import { terminateFirestore } from '../../src/services/terminate-firestore'

export async function tearDownRemoteFirestoreTests() {
  // we can add assertDb() if tests start failing to know what test corrupts the db
  await terminateFirestore()
}
