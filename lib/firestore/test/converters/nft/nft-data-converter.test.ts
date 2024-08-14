import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { getCollectionMockBySlug } from '@echo/model/mocks/collection/get-collection-mock-by-slug'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { describe, expect, it } from '@jest/globals'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, dissoc, pipe } from 'ramda'

describe('converters - nftDataConverter', () => {
  const id = nftMockSpiralJohnnyId()
  const mock = getNftMockById(id)
  const collection = getCollectionMockBySlug(mock.collection.slug)
  const document: NftDocumentData = pipe(getNftMockById, assoc('collection', collection), dissoc('tokenIdLabel'))(id)

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.NFTS}/${id}`
      },
      id,
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(mock)
  })

  it('from Firestore conversion without owner', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.NFTS}/${id}`
      },
      id,
      exists: true,
      data: () => dissoc('owner', document)
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(assoc('owner', undefined, mock))
  })
})
