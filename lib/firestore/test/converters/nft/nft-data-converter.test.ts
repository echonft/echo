import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import type { Nft } from '@echo/model/types/nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - nftDataConverter', () => {
  const document = getNftMockById('8hHFadIrrooORfTOLkBg')

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id: '8hHFadIrrooORfTOLkBg',
        path: 'nfts/8hHFadIrrooORfTOLkBg'
      } as unknown as DocumentReference<Nft>,
      id: '8hHFadIrrooORfTOLkBg',
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<Nft>
    expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(nftDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
