import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

export async function tearDownRemoteFirestoreTests() {
  // we can add assertDb() if tests start failing to know what test corrupts the db
  // await assertDb()
  await terminateFirestore()
}
