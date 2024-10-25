import { listingsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

function getListingReferenceById(id: string): DocumentReference<ListingDocument> {
  return getReferenceById({ collectionReference: listingsCollection(), id })
}

export function getListingById(id: string): Promise<Nullable<ListingDocument>> {
  return pipe(getListingReferenceById, getReferenceData)(id)
}
