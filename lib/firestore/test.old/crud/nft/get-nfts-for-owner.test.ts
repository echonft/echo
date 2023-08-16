import { getNftsForOwner } from '../../../src/crud/nft/get-nfts-for-owner'
import { nftFirestoreData } from '../../mocks/nft/nft-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft - getNftsForOwner', () => {
  it('user not returns an empty array', async () => {
    const nfts = await getNftsForOwner('notFound')
    expect(nfts.length).toEqual(0)
  })
  it('right query returns proper nfts', async () => {
    const nfts = await getNftsForOwner('oE6yUEQBPn7PZ89yMjKn')
    expect(nfts.length).toEqual(2)
    expect(nfts[0]).toEqual(nftFirestoreData['8hHFadIrrooORfTOLkBg'])
    expect(nfts[1]).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
