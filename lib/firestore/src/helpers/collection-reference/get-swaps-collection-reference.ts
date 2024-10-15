import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapsCollectionReference(): CollectionReference<SwapDocumentData, SwapDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.Swaps) as CollectionReference<
    SwapDocumentData,
    SwapDocumentData
  >
}
