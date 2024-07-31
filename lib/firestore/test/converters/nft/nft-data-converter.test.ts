import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, dissoc } from 'ramda'

describe('converters - nftDataConverter', () => {
  const id = nftMockSpiralJohnnyId()
  const document = getNftMockById(id)

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.NFTS}/${id}`
      } as unknown as DocumentReference<Nft>,
      id,
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion without owner', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.NFTS}/${id}`
      } as unknown as DocumentReference<Nft>,
      id,
      exists: true,
      data: () => dissoc('owner', document)
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(assoc('owner', undefined, document))
  })

  it('to Firestore conversion', () => {
    expect(nftDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
