import { nftResponseMock } from '@echo/nft-scan/mocks/nft-response-mock'
import { getNftResponseSchema } from '@echo/nft-scan/validators/get-nft-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'
import { pipe, prop } from 'ramda'

describe('validators - getNftResponseSchema', () => {
  it('maps correctly', () => {
    const response = pipe(nftResponseMock, prop('1'))()
    const result = getNftResponseSchema('blast').parse({ code: 200, data: response })
    expect(result).toEqual(nftResponseSchema('blast').parse(response))
  })

  it('returns undefined if it is not found', () => {
    expect(getNftResponseSchema('blast').parse({ code: 200, data: null })).toBeUndefined()
    expect(getNftResponseSchema('blast').parse({ code: 200, data: undefined })).toBeUndefined()
  })
})
