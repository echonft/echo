import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionReferenceById(id: string): Promise<DocumentReference<Collection, CollectionDocumentData>> {
  return getReferenceById({
    collectionReference: getCollectionsCollectionReference(),
    id
  })
}

export function getCollectionById(id: string): Promise<Nullable<Collection>> {
  return pipe(getCollectionReferenceById, andThen(getReferenceData))(id)
}
