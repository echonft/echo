import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingOfferReferenceById(id: string): DocumentReference<ListingOffer> {
  return getReferenceById<ListingOffer>({
    collectionReference: getListingOffersCollectionReference(),
    id
  })
}

export function getListingOfferById(id: string): Promise<Nullable<ListingOffer>> {
  return pipe(getListingOfferReferenceById, getReferenceData<ListingOffer>)(id)
}
