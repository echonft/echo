import { getOfferThreadByOfferId } from '@echo/firestore/crud/offer-thread/get-offer-thread-by-offer-id'
import { getOfferSnapshot } from '@echo/firestore/crud/offer/get-offer'
import type { OfferThreadDocumentData } from '@echo/firestore/types/model/offer-thread-document-data'
import type { Slug } from '@echo/model/types/slug'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function getOfferThreadByOfferSlug(slug: Slug): Promise<Nullable<OfferThreadDocumentData>> {
  const offerSnapshot = await getOfferSnapshot(slug)
  if (isNil(offerSnapshot)) {
    return undefined
  }
  return getOfferThreadByOfferId(offerSnapshot.id)
}
