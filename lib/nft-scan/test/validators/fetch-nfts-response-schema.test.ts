import { Chain } from '@echo/model/constants/chain'
import { nftResponseMock1, nftResponseMock2, nftResponseMock3 } from '@echo/nft-scan/mocks/nft-response-mock'
import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'
import { map } from 'ramda'

describe('validators - fetchNftsResponseSchema', () => {
  it('maps correctly', () => {
    const next = 'next'
    const content = [nftResponseMock1, nftResponseMock2, nftResponseMock3]
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
