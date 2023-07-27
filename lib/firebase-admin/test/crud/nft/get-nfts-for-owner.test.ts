import { getNftsForOwner } from '../../../src/crud/nft/get-nfts-for-owner'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - nft - getNftsForOwner', () => {
  it('user not returns an empty array', async () => {
    const result = await getNftsForOwner('notFound')
    expect(R.isOk(result)).toBeTruthy()
    const data = R.getExn(result)
    expect(data.length).toEqual(0)
  })
  it('right query returns proper nfts', async () => {
    const result = await getNftsForOwner('oE6yUEQBPn7PZ89yMjKn')
    expect(R.isOk(result)).toBeTruthy()
    const data = R.getExn(result)
    expect(data.length).toEqual(2)
    expect(data[0]).toEqual(nftFirestoreData['8hHFadIrrooORfTOLkBg'])
    expect(data[1]).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
