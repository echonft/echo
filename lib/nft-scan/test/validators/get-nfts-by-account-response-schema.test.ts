import { nftResponseMock } from '@echo/nft-scan/mocks/nft-response-mock'
import { getNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-nfts-by-account-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'
import { juxt, map, pipe, prop } from 'ramda'

describe('validators - getNftsByAccountResponseSchema', () => {
  it('maps correctly', () => {
    const next = 'next'
    const content = pipe(nftResponseMock, juxt([prop('1'), prop('2'), prop('3')]))()
    const response = {
      code: 200,
      data: {
        next,
        content
      }
    }
    const result = getNftsByAccountResponseSchema('blast').parse(response)
    expect(result).toEqual({
      next,
      content: map((response) => nftResponseSchema('blast').parse(response), content)
    })
  })
})
