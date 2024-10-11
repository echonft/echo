import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer/listing-offer-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getListingOfferReferenceById(
  id: string
): Promise<DocumentReference<ListingOfferDocumentData, ListingOfferDocumentData>> {
  return getReferenceById({
    collectionReference: getListingOffersCollectionReference(),
    id
  })
}

export function getListingOfferById(id: string): Promise<Nullable<ListingOfferDocumentData>> {
  return pipe(getListingOfferReferenceById, andThen(getReferenceData))(id)
}
