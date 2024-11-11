import { TokenType } from '@echo/model/constants/token-type'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { describe, expect, it } from '@jest/globals'
import { map } from 'ramda'

describe('fetchNftsResponseSchema', () => {
  const nftResponseMock1: NftResponse = {
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
  const nftResponseMock2: NftResponse = {
    contract_address: '0x89ae653674178738854c83426c6ac6be69900766',
    token_id: '3353',
    erc_type: TokenType.Erc721,
    name: 'PugLife #3353',
    image_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3353.png',
    owner: userMockCrew.wallet,
    attributes: [
      {
        attribute_name: 'PugLife',
        attribute_value: '8371'
      },
      {
        attribute_name: 'Pug Life',
        attribute_value: '8207'
      }
    ]
  }
  const nftResponseMock3: NftResponse = {
    contract_address: '0x89ae653674178738854c83426c6ac6be69900766',
    token_id: '3344',
    erc_type: TokenType.Erc721,
    name: 'PugLife #3344',
    image_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3344.png',
    owner: userMockCrew.wallet,
    attributes: [
      {
        attribute_name: 'PugLife',
        attribute_value: '8873'
      },
      {
        attribute_name: 'Pug Life',
        attribute_value: '6011'
      }
    ]
  }

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
    expect(fetchNftsResponseSchema.parse(response)).toEqual({
      next,
      content: map((response) => nftResponseSchema.parse(response), content)
    })
  })
})
