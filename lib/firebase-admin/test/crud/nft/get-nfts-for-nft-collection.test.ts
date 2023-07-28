import { getNftsForNftCollection } from '../../../src/crud/nft/get-nfts-for-nft-collection'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - nft - getNftsForNftCollection', () => {
  it('collection not found throws an error', async () => {
    const result = await getNftsForNftCollection({
      address: '0x12c63bbD266dB84e117356e664f3604055166CEb',
      chainId: 1
    })
    expect(R.isOk(result)).toBeFalsy()
    R.catchError((error: Error) => {
      expect(error).toMatch('contract not found')
      return R.Error(error)
    })
  })
  it('right query returns proper nfts', async () => {
    const result = await getNftsForNftCollection({
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      chainId: 1
    })
    expect(R.isOk(result)).toBeTruthy()
    const data = R.getExn(result)
    expect(data.length).toEqual(1)
    expect(data[0]).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
