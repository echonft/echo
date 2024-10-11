import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { nftDocumentDataMock } from '@echo/firestore/mocks/nft/nft-document-data-mock'
import { nftSnapshotMock } from '@echo/firestore/mocks/nft/nft-snapshot-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMock, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { describe, expect, it } from '@jest/globals'
import { assoc, dissoc, mapObjIndexed } from 'ramda'

describe('converters - nftDataConverter', () => {
  it('from Firestore conversion', () => {
    const snapshots = nftSnapshotMock()
    mapObjIndexed((snapshot, id) => {
      expect(nftDataConverter.fromFirestore(snapshot)).toStrictEqual(getNftMockById(id))
    }, snapshots)
  })

  it('from Firestore conversion without owner', () => {
    const id = nftMockSpiralJohnnyId()
    const snapshot = nftSnapshotMock()[id]!
    const noOwnerSnapshot = assoc('data', () => dissoc('owner', nftDocumentDataMock()[id]!), snapshot)
    expect(nftDataConverter.fromFirestore(noOwnerSnapshot)).toStrictEqual(assoc('owner', undefined, getNftMockById(id)))
  })

  it('to Firestore conversion', () => {
    const nfts = nftMock()
    const documentData = nftDocumentDataMock()
    mapObjIndexed((nft, id) => {
      expect(nftDataConverter.toFirestore(nft)).toStrictEqual(documentData[id])
    }, nfts)
  })
})
