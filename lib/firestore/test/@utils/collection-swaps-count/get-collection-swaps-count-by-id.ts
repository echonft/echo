import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getCollectionSwapsCountReferenceById(id: string): DocumentReference<CollectionSwapsCount> {
  return getReferenceById<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id
  })
}

export function getCollectionSwapsCountById(id: string): Promise<Nullable<CollectionSwapsCount>> {
  return pipe(getCollectionSwapsCountReferenceById, getReferenceData<CollectionSwapsCount>)(id)
}
