import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { collectionResponseMock } from '@echo/nft-scan/mocks/collection-response-mock'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('validators - collectionResponseSchema', () => {
  const expectedResult: Collection = {
    contract: {
      address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461'.toLowerCase(),
      chain: 'blast'
    } as Wallet,
    name: 'BACGenesis',
    slug: 'bacgenesis',
    totalSupply: 3000,
    discordUrl: undefined,
    profilePictureUrl: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    websiteUrl: 'https://bacgame.io/',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    bannerUrl: undefined,
    twitterUsername: 'BAC_Web3',
    type: 'erc721',
    verified: false
  }

  it('maps correctly with no slug', () => {
    const result = collectionResponseSchema('blast').parse(collectionResponseMock())
    expect(result).toEqual({ collection: expectedResult, isSpam: false })
  })

  it('maps correctly with no slug name with space', () => {
    const response = pipe(collectionResponseMock, assoc('name', 'Name With Space'))()
    const resultWithSlug = pipe(assoc('name', 'Name With Space'), assoc('slug', 'name-with-space'))(expectedResult)
    const result = collectionResponseSchema('blast').parse(response)
    expect(result).toEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('maps correctly with slug', () => {
    const response = pipe(collectionResponseMock, assoc('opensea_slug', 'opensea-slug'))()
    const resultWithSlug = assoc('slug', 'opensea-slug', expectedResult)
    const result = collectionResponseSchema('blast').parse(response)
    expect(result).toEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('returns isSpam true if the collection is a spam collection', () => {
    const response = pipe(collectionResponseMock, assoc('is_spam', true))()
    const result = collectionResponseSchema('blast').parse(response)
    expect(result).toEqual({ collection: undefined, isSpam: true })
  })
})
