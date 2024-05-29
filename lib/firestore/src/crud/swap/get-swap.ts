import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import { getSwapSnapshotByOfferId } from '@echo/firestore/crud/swap/get-swap-by-offer-id'
import type { Swap } from '@echo/firestore/types/model/swap/swap'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function getSwapSnapshot(offerSlug: string): Promise<Nullable<QueryDocumentSnapshot<Swap>>> {
  const snapshot = await getOfferSnapshot(offerSlug)
  if (isNil(snapshot)) {
    throw Error(`offer with slug ${offerSlug} does not exist`)
  }
  return getSwapSnapshotByOfferId(snapshot.id)
}
