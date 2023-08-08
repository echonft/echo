import { getNftsForNftCollection } from '../../../src/crud/nft/get-nfts-for-nft-collection'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft - getNftsForNftCollection', () => {
  it('collection not found throws an error', async () => {
    try {
      await getNftsForNftCollection({
        address: '0x12c63bbD266dB84e117356e664f3604055166CEb',
        chainId: 1
      })
    } catch (error) {
      expect(error).toBe('contract not found')
    }
  })
  it('right query returns proper nfts', async () => {
    const nfts = await getNftsForNftCollection({
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      chainId: 1
    })
    const nft = nfts.find((nftData) => nftData.id === 'QFjMRNChUAHNswkRADXh')
    expect(nft).toEqual(nftFirestoreData['QFjMRNChUAHNswkRADXh'])
  })
})
