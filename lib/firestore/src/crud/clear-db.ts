import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, pipe, values } from 'ramda'

export async function clearDb() {
  initializeFirebase()
  await pipe(
    values,
    map((collectionPath: string) => {
      const reference = firestoreApp().collection(collectionPath)
      return firestoreApp().recursiveDelete(reference)
    }),
    promiseAll
  )(CollectionReferenceName)
  await terminateFirestore()
}
