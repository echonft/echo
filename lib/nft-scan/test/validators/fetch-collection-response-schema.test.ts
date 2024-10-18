import { collectionResponseMock } from '@echo/nft-scan/mocks/collection-response-mock'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { fetchCollectionResponseSchema } from '@echo/nft-scan/validators/fetch-collection-response-schema'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'

describe('validators - fetchCollectionResponseSchema', () => {
  it('maps correctly', () => {
    const result = fetchCollectionResponseSchema(Chain.Blast).parse({ code: 200, data: collectionResponseMock() })
    expect(result).toEqual(collectionResponseSchema(Chain.Blast).parse(collectionResponseMock()))
  })

  it('returns undefined collection if it is not found', () => {
    expect(fetchCollectionResponseSchema(Chain.Blast).parse({ code: 200, data: null })).toEqual({
      collection: undefined,
      isSpam: false
    })
    expect(fetchCollectionResponseSchema(Chain.Blast).parse({ code: 200, data: undefined })).toEqual({
      collection: undefined,
      isSpam: false
    })
  })
})
