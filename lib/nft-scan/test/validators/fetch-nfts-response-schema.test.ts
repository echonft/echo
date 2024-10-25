import { nftResponseMock } from '@echo/nft-scan/mocks/nft-response-mock'
import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { Chain } from '@echo/model/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { juxt, map, pipe, prop } from 'ramda'

describe('validators - fetchNftsResponseSchema', () => {
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
    const result = fetchNftsResponseSchema(Chain.Blast).parse(response)
    expect(result).toEqual({
      next,
      content: map((response) => nftResponseSchema(Chain.Blast).parse(response), content)
    })
  })
})
