import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { updateDb } from '@echo/helper/tasks/update-db'

void (async function () {
  void updateDb()
  await terminateFirestore()
})()
