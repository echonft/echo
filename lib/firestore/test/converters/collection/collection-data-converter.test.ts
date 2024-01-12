import { collectionDataConverter } from '@echo/firestore/converters/collection/collection-data-converter'
import type { Collection } from '@echo/model/types/collection'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - collectionDataConverter', () => {
  const document = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id: 'Rc8pLQXxgyQGIRL0fr13',
        path: 'nft-collections/Rc8pLQXxgyQGIRL0fr13'
      } as unknown as DocumentReference<Collection>,
      id: 'Rc8pLQXxgyQGIRL0fr13',
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Collection>
    expect(collectionDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(collectionDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
