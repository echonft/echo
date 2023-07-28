import { findNftByCollection } from '../../../src/crud/nft/find-nft-by-collection'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - nft - findNftByCollection', () => {
  it('collection not found returns an error', async () => {
    const result = await findNftByCollection({
      contract: {
        address: '0x12c63bbD266dB84e117356e664f3604055166CEb',
        chainId: 1
      },
      tokenId: 17
    })
    expect(R.isOk(result)).toBeFalsy()
    R.catchError((error: Error) => {
      expect(error).toMatch('contract not found')
      return R.Error(error)
    })
  })
  it('collection found but tokenId does not exist returns an error', async () => {
    const result = await findNftByCollection({
      contract: {
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1
      },
      tokenId: 1
    })
    expect(R.isOk(result)).toBeFalsy()
    R.catchError((error: Error) => {
      expect(error).toMatch('nft not found')
      return R.Error(error)
    })
  })
  it('right query returns proper nft', async () => {
    const result = await findNftByCollection({
      contract: {
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1
      },
      tokenId: 17
    })
    expect(R.isOk(result)).toBeTruthy()
    expect(R.getExn(result)).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
