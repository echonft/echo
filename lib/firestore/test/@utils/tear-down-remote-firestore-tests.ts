import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

export async function tearDownRemoteFirestoreTests() {
  await terminateFirestore()
}
