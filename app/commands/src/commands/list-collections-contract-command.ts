import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

void (async function () {
  initializeFirebase()
  const collections = await getAllCollections()
  for (const collection of collections) {
    console.log(`${collection.name} => ${collection.contract.address}`)
  }
  await terminateFirestore()
  process.exit()
})()
