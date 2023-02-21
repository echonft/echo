import { FirestoreData, FirestoreSubcollection } from '@echo/firestore'
import { CollectionReference, DocumentData } from '@google-cloud/firestore'

export type SubcollectionConverter<T extends DocumentData, V extends FirestoreData> = (
  collectionReference: CollectionReference<T>
) => Promise<FirestoreSubcollection<V>>
