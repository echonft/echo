import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getCollectionReferenceById(id: string): DocumentReference<Collection, CollectionDocumentData> {
  return getReferenceById({
    collectionReference: getCollectionsCollectionReference(),
    id
  })
}

export function getCollectionById(id: string): Promise<Nullable<Collection>> {
  return pipe(getCollectionReferenceById, getReferenceData)(id)
}
