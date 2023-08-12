import { mapNftToNftIdWithContractAddress } from '../../src/mappers/nft/map-nft-to-nft-id-with-contract-address'
import { nftFirestoreData } from '../mocks/nft-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftToId', () => {
  it('converts correctly', () => {
    let nft = nftFirestoreData['QFjMRNChUAHNswkRADXh']!
    let expected = { contractAddress: nft.collection.contract.address, tokenId: nft.tokenId }
    expect(mapNftToNftIdWithContractAddress(nft)).toEqual(expected)
    nft = nftFirestoreData['8hHFadIrrooORfTOLkBg']!
    expected = { contractAddress: nft.collection.contract.address, tokenId: nft.tokenId }
    expect(mapNftToNftIdWithContractAddress(nft)).toEqual(expected)
  })
})
