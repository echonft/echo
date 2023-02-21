import { FirestoreSubcollection } from '../../abstract'
import { FirestoreData } from '../../model'
import { CollectionReference, DocumentData } from 'firebase/firestore'

export type SubcollectionConverter<T extends DocumentData, V extends FirestoreData> = (
  collectionReference: CollectionReference<T>
) => Promise<FirestoreSubcollection<V>>
