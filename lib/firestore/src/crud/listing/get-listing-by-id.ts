import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { Listing } from '@echo/model/types/listing'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getListingReferenceById(id: string): DocumentReference<Listing> {
  return getReferenceById<Listing>({ collectionReference: getListingsCollectionReference(), id })
}

export function getListingById(id: string): Promise<Nullable<Listing>> {
  return pipe(getListingReferenceById, getReferenceData<Listing>)(id)
}
