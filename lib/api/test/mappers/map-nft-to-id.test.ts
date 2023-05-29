import { mapNftToId } from '../../src/mappers/map-nft-to-id'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftToId', () => {
  it('converts correctly', () => {
    let nft = nftFirestoreData['QFjMRNChUAHNswkRADXh']!
    expect(mapNftToId(nft)).toEqual(nft.id)
    nft = nftFirestoreData['8hHFadIrrooORfTOLkBg']!
    expect(mapNftToId(nft)).toEqual(nft.id)
  })
})
