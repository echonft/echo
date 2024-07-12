import { collectionResponseMock } from '@echo/nft-scan/mocks/collection-response-mock'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { getCollectionResponseSchema } from '@echo/nft-scan/validators/get-collection-response-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - getCollectionResponseSchema', () => {
  it('maps correctly', () => {
    const result = getCollectionResponseSchema('blast').parse({ code: 200, data: collectionResponseMock() })
    expect(result).toEqual(collectionResponseSchema('blast').parse(collectionResponseMock()))
  })

  it('returns undefined collection if it is not found', () => {
    expect(getCollectionResponseSchema('blast').parse({ code: 200, data: null })).toEqual({
      collection: undefined,
      isSpam: false
    })
    expect(getCollectionResponseSchema('blast').parse({ code: 200, data: undefined })).toEqual({
      collection: undefined,
      isSpam: false
    })
  })
})
