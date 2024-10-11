import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { SwapPostDocumentData } from '@echo/firestore/types/model/swap-post/swap-post-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getSwapPostReferenceById(
  id: string
): Promise<DocumentReference<SwapPostDocumentData, SwapPostDocumentData>> {
  return getReferenceById({
    collectionReference: getSwapPostsCollectionReference(),
    id
  })
}

export function getSwapPostById(id: string): Promise<Nullable<SwapPostDocumentData>> {
  return pipe(getSwapPostReferenceById, andThen(getReferenceData))(id)
}
