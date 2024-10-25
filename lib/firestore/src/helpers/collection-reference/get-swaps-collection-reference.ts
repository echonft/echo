import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { swapDataConverter } from '@echo/firestore/converters/swap-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Swap } from '@echo/model/types/swap'
import { CollectionReference } from 'firebase-admin/firestore'

export function getSwapsCollectionReference(): CollectionReference<Swap, SwapDocumentData> {
  return firestoreApp().collection(CollectionReferenceName.Swaps).withConverter(swapDataConverter)
}
