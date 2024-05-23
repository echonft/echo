import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import type { Nft } from '@echo/model/types/nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - nftDataConverter', () => {
  const document = getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id: NFT_MOCK_SPIRAL_JOHNNY_ID,
        path: `nfts/${NFT_MOCK_SPIRAL_JOHNNY_ID}`
      } as unknown as DocumentReference<Nft>,
      id: NFT_MOCK_SPIRAL_JOHNNY_ID,
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(nftDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
