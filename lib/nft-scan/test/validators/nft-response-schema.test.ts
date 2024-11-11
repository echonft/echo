import { TokenType } from '@echo/model/constants/token-type'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'

describe('nftResponseSchema', () => {
  const response: NftResponse = {
    contract_address: '0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39',
    token_id: '2944',
    erc_type: TokenType.Erc721,
    name: 'Blast Penguins #2944',
    image_uri: 'bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
    owner: userMockJohnny.wallet,
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
  const expectedResult: PartialNft = {
    collection: {
      contract: '0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39'
    },
    tokenId: 2944,
    pictureUrl: 'bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
    name: 'Blast Penguins #2944',
    owner: userMockJohnny.wallet,
    attributes: [
      { trait: 'Backgrounds', value: 'Purple' },
      { trait: 'Base', value: 'Purple Gradient' },
      { trait: 'Clothes', value: 'Blue Puffer' },
      { trait: 'Head', value: 'None' },
      { trait: 'Eyes', value: 'None' },
      { trait: 'Acessories', value: 'None' }
    ],
    type: TokenType.Erc721
  }

  it('maps correctly with no name', () => {
    const noNameResponse = { ...response, name: null }
    const noNameResult = { ...expectedResult, name: '2944' }
    expect(nftResponseSchema.parse(noNameResponse)).toStrictEqual(noNameResult)
  })

  it('maps correctly with no attributes', () => {
    const noAttributesResponse = { ...response, attributes: null }
    const noAttributesResult = { ...expectedResult, attributes: [] }
    expect(nftResponseSchema.parse(noAttributesResponse)).toStrictEqual(noAttributesResult)
  })
})
