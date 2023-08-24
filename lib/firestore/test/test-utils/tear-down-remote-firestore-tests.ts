import { terminate } from '../../src/services/terminate'

export async function tearDownRemoteFirestoreTests() {
  // we can add assertDb() if tests start failing to know what test corrupts the db
  await terminate()
}
