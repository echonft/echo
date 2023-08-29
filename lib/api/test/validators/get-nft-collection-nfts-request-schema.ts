import { nftCollectionRequestSchema } from '../../src/validators/nft-collection-request-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - nftCollectionRequestSchema', () => {
  it('throws if slug is not an array of strings with length 1 or 2', () => {
    expect(() => nftCollectionRequestSchema.parse({})).toThrow()
    expect(() => nftCollectionRequestSchema.parse({ slug: undefined })).toThrow()
    expect(() => nftCollectionRequestSchema.parse({ slug: [] })).toThrow()
    expect(() => nftCollectionRequestSchema.parse({ slug: [1, 2] })).toThrow()
    expect(() => nftCollectionRequestSchema.parse({ slug: ['1', 2] })).toThrow()
    expect(() => nftCollectionRequestSchema.parse({ slug: ['1', '2', '3'] })).toThrow()
  })
  it('valid', () => {
    const validRequest = {
      slug: ['1', '2']
    }
    expect(nftCollectionRequestSchema.parse(validRequest)).toStrictEqual(validRequest)
  })
})
