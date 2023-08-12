import { findNftByCollection } from '../../../src/crud/nft/find-nft-by-collection'
import { nftFirestoreData } from '../../mocks/nft/nft-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft - findNftByCollection', () => {
  it('collection not found returns an error', async () => {
    try {
      await findNftByCollection({
        contract: {
          address: '0x12c63bbD266dB84e117356e664f3604055166CEb',
          chainId: 1
        },
        tokenId: 17
      })
    } catch (error) {
      expect(error).toBe('contract not found')
    }
  })
  it('collection found but tokenId does not exist returns an error', async () => {
    try {
      await findNftByCollection({
        contract: {
          address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
          chainId: 1
        },
        tokenId: 1
      })
    } catch (error) {
      expect(error).toBe('nft not found')
    }
  })
  it('right query returns proper nft', async () => {
    const nft = await findNftByCollection({
      contract: {
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1
      },
      tokenId: 17
    })
    expect(nft).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
