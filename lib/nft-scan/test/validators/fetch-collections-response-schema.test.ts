import { TokenType } from '@echo/model/constants/token-type'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { fetchCollectionsResponseSchema } from '@echo/nft-scan/validators/fetch-collections-response-schema'
import { describe, expect, it } from '@jest/globals'
import { map } from 'ramda'

describe('fetchCollectionsResponseSchema', () => {
  const collectionResponseMock: CollectionResponse = {
    contract_address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461',
    name: 'BACGenesis',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    website: 'https://bacgame.io/',
    twitter: 'BAC_Web3',
    discord: null,
    logo_url: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    erc_type: TokenType.Erc721,
    is_spam: false,
    items_total: 3000
  }

  it('maps correctly', () => {
    const content = [collectionResponseMock, collectionResponseMock, collectionResponseMock]
    const response = {
      code: 200,
      data: content
    }
    expect(fetchCollectionsResponseSchema.parse(response)).toEqual(
      map((response) => collectionResponseSchema.parse(response), content)
    )
  })
})
