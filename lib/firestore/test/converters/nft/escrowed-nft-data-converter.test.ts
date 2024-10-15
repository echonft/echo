import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { escrowedNftDataConverter } from '@echo/firestore/converters/nft/escrowed-nft-data-converter'
import type { EscrowedNftDocumentData } from '@echo/firestore/types/model/nft/escrowed-nft-document-data'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'
import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore'

describe('converters - escrowedNftDataConverter', () => {
  const id = 'escrowed-nft-id'
  const nftId = nftMockSpiralJohnnyId()
  const document: EscrowedNftDocumentData = {
    nftId,
    owner: getNftMockById(nftId).owner
  }

  it('from Firestore conversion', () => {
    const snapshot = {
      ref: {
        id,
        path: `${CollectionReferenceName.EscrowedNfts}/${id}`
      } as unknown as DocumentReference<EscrowedNftDocumentData, EscrowedNftDocumentData>,
      id,
      exists: true,
      data: () => document
    } as unknown as QueryDocumentSnapshot<EscrowedNftDocumentData, EscrowedNftDocumentData>
    expect(escrowedNftDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(escrowedNftDataConverter.toFirestore(document)).toStrictEqual(document)
  })
})
