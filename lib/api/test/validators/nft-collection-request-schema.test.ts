import { getNftCollectionNftsRequestSchema } from '../../src/validators/get-nft-collection-nfts-request-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - getNftCollectionNftsRequestSchema', () => {
  it('throws if slug is not an array containing exactly 2 items and the last one being "nfts"', () => {
    expect(() => getNftCollectionNftsRequestSchema.parse({})).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: undefined })).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: [] })).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: [1, 2] })).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: ['1', 2] })).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: ['1', '2', '3'] })).toThrow()
    expect(() => getNftCollectionNftsRequestSchema.parse({ slug: ['1', '2'] })).toThrow()
  })
  it('valid', () => {
    const validRequest = {
      slug: ['1', 'nfts']
    }
    expect(getNftCollectionNftsRequestSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
