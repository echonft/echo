import { Chain } from '@echo/model/constants/chain'
import { nftResponseMock1 } from '@echo/nft-scan/mocks/nft-response-mock'
import { fetchNftResponseSchema } from '@echo/nft-scan/validators/fetch-nft-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - fetchNftResponseSchema', () => {
  it('maps correctly', () => {
    const response = nftResponseMock1
    const result = fetchNftResponseSchema(Chain.Blast).parse({ code: 200, data: response })
    expect(result).toEqual(nftResponseSchema(Chain.Blast).parse(response))
  })

  it('returns undefined if it is not found', () => {
    expect(fetchNftResponseSchema(Chain.Blast).parse({ code: 200, data: undefined })).toBeUndefined()
  })
})
