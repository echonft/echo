import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getCollectionSwapsCountCollectionReference(): CollectionReference<
  CollectionSwapsCountDocumentData,
  CollectionSwapsCountDocumentData
> {
  return firestoreApp().collection(CollectionReferenceName.CollectionSwapsCount) as CollectionReference<
    CollectionSwapsCountDocumentData,
    CollectionSwapsCountDocumentData
  >
}
