import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { assertDb } from '@test-utils/assert-db'

export async function tearDownRemoteFirestoreTests() {
  // we can add assertDb() if tests start failing to know what test corrupts the db
  await assertDb()
  await terminateFirestore()
}
