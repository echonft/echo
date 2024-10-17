import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getSwapSnapshotByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function getSwapSnapshot(
  offerSlug: Slug
): Promise<Nullable<QueryDocumentSnapshot<SwapDocumentData, SwapDocumentData>>> {
  const snapshot = await getOfferSnapshot(offerSlug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`offer with slug ${offerSlug} does not exist`))
  }
  return getSwapSnapshotByOfferId(snapshot.id)
}
