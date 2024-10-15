import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'

export async function resetFirestoreCollection(collectionReferenceName: CollectionReferenceName) {
  const documents = await firestoreApp().collection(collectionReferenceName).listDocuments()
  for (const document of documents) {
    await document.delete()
  }
  await initializeFirestoreCollection(collectionReferenceName)
}
