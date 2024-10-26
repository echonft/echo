import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { collectionResponseMock } from '@echo/nft-scan/mocks/collection-response-mock'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('validators - collectionResponseSchema', () => {
  const expectedResult: Collection = {
    contract: {
      address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461'.toLowerCase(),
      chain: Chain.Blast
    } as Contract,
    name: 'BACGenesis',
    slug: 'bacgenesis',
    totalSupply: 3000,
    discordUrl: undefined,
    profilePictureUrl: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    websiteUrl: 'https://bacgame.io/',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    twitterUsername: 'BAC_Web3',
    type: TokenType.Erc721,
    verified: false
  }

  it('maps correctly with no slug', () => {
    const result = collectionResponseSchema(Chain.Blast).parse(collectionResponseMock)
    expect(result).toEqual({ collection: expectedResult, isSpam: false })
  })

  it('maps correctly with no slug name with space', () => {
    const response = assoc('name', 'Name With Space', collectionResponseMock)
    const resultWithSlug = pipe(assoc('name', 'Name With Space'), assoc('slug', 'name-with-space'))(expectedResult)
    const result = collectionResponseSchema(Chain.Blast).parse(response)
    expect(result).toEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('maps correctly with slug', () => {
    const response = assoc('opensea_slug', 'opensea-slug', collectionResponseMock)
    const resultWithSlug = assoc('slug', 'opensea-slug', expectedResult)
    const result = collectionResponseSchema(Chain.Blast).parse(response)
    expect(result).toEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('returns isSpam true if the collection is a spam collection', () => {
    const response = assoc('is_spam', true, collectionResponseMock)
    const result = collectionResponseSchema(Chain.Blast).parse(response)
    expect(result).toEqual({ collection: undefined, isSpam: true })
  })
})
