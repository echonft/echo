import type { Collection, Contract } from '@echo/model/types/collection'
import { mapCollectionResponse } from '@echo/nft-scan/mappers/map-collection-response'
import type { GetCollectionResponse } from '@echo/nft-scan/types/response/get-collection-response'
import { collectionResponseMock } from '@echo/nft-scan-mocks/collection-response-mock'
import { CHAIN_BLAST } from '@echo/utils/constants/chains/chains'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapCollectionResponse', () => {
  const expectedResult: Omit<Collection, 'swapsCount'> = {
    contract: {
      address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461'.toLowerCase(),
      chain: CHAIN_BLAST
    } as Contract,
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
    verified: false
  }

  it('maps correctly with no slug', () => {
    const result = mapCollectionResponse(collectionResponseMock as GetCollectionResponse, CHAIN_BLAST)
    expect(result).toEqual(expectedResult)
  })

  it('maps correctly with no slug name with space', () => {
    const response = { ...collectionResponseMock, name: 'Name With Space' } as GetCollectionResponse
    const resultWithSlug = { ...expectedResult, name: 'Name With Space', slug: 'name-with-space' }

    const result = mapCollectionResponse(response, CHAIN_BLAST)
    expect(result).toEqual(resultWithSlug)
  })

  it('maps correctly with slug', () => {
    const response = { ...collectionResponseMock, opensea_slug: 'opensea-slug' } as GetCollectionResponse
    const resultWithSlug = { ...expectedResult, slug: 'opensea-slug' }
    const result = mapCollectionResponse(response, CHAIN_BLAST)
    expect(result).toEqual(resultWithSlug)
  })
})
