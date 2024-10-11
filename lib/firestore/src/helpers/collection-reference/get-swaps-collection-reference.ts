import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapsCollectionReference(): CollectionReference<SwapDocumentData, SwapDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.SWAPS) as CollectionReference<
    SwapDocumentData,
    SwapDocumentData
  >
}
