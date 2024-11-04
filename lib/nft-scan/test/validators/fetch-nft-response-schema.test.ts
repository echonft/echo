import { TokenType } from '@echo/model/constants/token-type'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { fetchNftResponseSchema } from '@echo/nft-scan/validators/fetch-nft-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - fetchNftResponseSchema', () => {
  it('maps correctly', () => {
    const response: NftResponse = {
      contract_address: '0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39',
      token_id: '2944',
      erc_type: TokenType.Erc721,
      name: 'Blast Penguins #2944',
      image_uri: 'bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
      attributes: [
        {
          attribute_name: 'Backgrounds',
          attribute_value: 'Purple'
        },
        {
          attribute_name: 'Base',
          attribute_value: 'Purple Gradient'
        },
        {
          attribute_name: 'Clothes',
          attribute_value: 'Blue Puffer'
        },
        {
          attribute_name: 'Head',
          attribute_value: 'None'
        },
        {
          attribute_name: 'Eyes',
          attribute_value: 'None'
        },
        {
          attribute_name: 'Acessories',
          attribute_value: 'None'
        }
      ]
    }
    expect(fetchNftResponseSchema.parse({ code: 200, data: response })).toEqual(nftResponseSchema.parse(response))
  })

  it('returns undefined if it is not found', () => {
    expect(fetchNftResponseSchema.parse({ code: 200, data: undefined })).toBeUndefined()
  })
})
