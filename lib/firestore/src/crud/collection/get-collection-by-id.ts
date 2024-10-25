import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

function getCollectionReferenceById(id: string): DocumentReference<CollectionDocument> {
  return getReferenceById({
    collectionReference: collectionsCollection(),
    id
  })
}

export function getCollectionById(id: string): Promise<Nullable<CollectionDocument>> {
  return pipe(getCollectionReferenceById, getReferenceData)(id)
}
