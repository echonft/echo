import { nftResponseMock } from '@echo/nft-scan/mocks/nft-response-mock'
import { fetchNftResponseSchema } from '@echo/nft-scan/validators/fetch-nft-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'
import { pipe, prop } from 'ramda'

describe('validators - fetchNftResponseSchema', () => {
  it('maps correctly', () => {
    const response = pipe(nftResponseMock, prop('1'))()
    const result = fetchNftResponseSchema('blast').parse({ code: 200, data: response })
    expect(result).toEqual(nftResponseSchema('blast').parse(response))
  })

  it('returns undefined if it is not found', () => {
    expect(fetchNftResponseSchema('blast').parse({ code: 200, data: null })).toBeUndefined()
    expect(fetchNftResponseSchema('blast').parse({ code: 200, data: undefined })).toBeUndefined()
  })
})
