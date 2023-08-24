import { initialize } from '../../src/services/initialize'

export function tearUpRemoteFirestoreTests() {
  initialize()
  // await resetDb()
}
