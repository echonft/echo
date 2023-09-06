import { mapListingTarget } from '../../../src/mappers/from-api/map-listing-target'
import { ListingTarget } from '../../../src/types/listing-target'
import { ListingTargetResponse } from '@echo/api'
import { describe, expect, it } from '@jest/globals'

describe('mappers - from-api - mapListingTarget', () => {
  const listingTargetResponse: ListingTargetResponse = {
    amount: 1,
    collection: {
      id: '1aomCtnoesD7WVll6Yi1',
      bannerUrl: 'https://echo.xyz',
      blurUrl: 'https://echo.xyz',
      contract: {
        tokenType: 'ERC721',
        address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
        chainId: 1
      },
      description: 'A Genetic Chain Project.',
      discordUrl: 'https://echo.xyz',
      floorPrice: 0.037,
      name: 'Spiral Frequencies',
      openSeaUrl: 'https://echo.xyz',
      slug: 'spiral-frequencies',
      profilePictureUrl: 'https://echo.xyz',
      totalSupply: 6315,
      twitterUsername: 'GeneticChain',
      websiteUrl: 'https://echo.xyz'
    }
  }
  const listingTarget: ListingTarget = {
    amount: 1,
    collection: {
      id: '1aomCtnoesD7WVll6Yi1',
      bannerUrl: new URL('https://echo.xyz'),
      blurUrl: new URL('https://echo.xyz'),
      contract: {
        tokenType: 'ERC721',
        address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
        chainId: 1
      },
      description: 'A Genetic Chain Project.',
      discordUrl: new URL('https://echo.xyz'),
      floorPrice: 0.037,
      name: 'Spiral Frequencies',
      openSeaUrl: new URL('https://echo.xyz'),
      slug: 'spiral-frequencies',
      profilePictureUrl: new URL('https://echo.xyz'),
      totalSupply: 6315,
      twitterUsername: 'GeneticChain',
      websiteUrl: new URL('https://echo.xyz')
    }
  }
  it('maps correctly', () => {
    expect(mapListingTarget(listingTargetResponse)).toStrictEqual(listingTarget)
  })
})
