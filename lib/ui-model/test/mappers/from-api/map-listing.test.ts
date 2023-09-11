import { mapListing } from '../../../src/mappers/from-api/map-listing'
import { Listing } from '../../../src/types/listing'
import { ListingItem } from '../../../src/types/listing-item'
import { ListingTarget } from '../../../src/types/listing-target'
import type { ListingItemResponse, ListingResponse, ListingTargetResponse } from '@echo/api/types'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('mappers - from-api - mapListing', () => {
  const listingItemResponse: ListingItemResponse = {
    amount: 1,
    nft: {
      id: '8hHFadIrrooORfTOLkBg',
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ],
      balance: 1,
      blurUrl: 'https://echo.xyz',
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
      },
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycagewins',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        username: 'johnnycagewins',
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      openSeaUrl: 'https://echo.xyz',
      pictureUrl: 'https://echo.xyz',
      thumbnailUrl: 'https://echo.xyz',
      tokenId: 1376,
      tokenType: 'ERC721'
    }
  }
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
  const listingResponse: ListingResponse = {
    id: 'listing-id',
    createdAt: 1676984897,
    creator: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expired: false,
    expiresAt: 2324074781,
    state: 'OPEN',
    items: [listingItemResponse],
    targets: [listingTargetResponse]
  }

  const listingItem: ListingItem = {
    amount: 1,
    nft: {
      id: '8hHFadIrrooORfTOLkBg',
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ],
      balance: 1,
      blurUrl: new URL('https://echo.xyz'),
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
      },
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycagewins',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        username: 'johnnycagewins',
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      openSeaUrl: new URL('https://echo.xyz'),
      pictureUrl: new URL('https://echo.xyz'),
      thumbnailUrl: new URL('https://echo.xyz'),
      tokenId: 1376,
      tokenType: 'ERC721'
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
  const listing: Listing = {
    id: 'listing-id',
    createdAt: dayjs.unix(1676984897),
    creator: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycagewins',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      username: 'johnnycagewins',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expired: false,
    expiresAt: dayjs.unix(2324074781),
    state: 'OPEN',
    items: [listingItem],
    targets: [listingTarget]
  }
  it('maps correctly', () => {
    expect(mapListing(listingResponse)).toStrictEqual(listing)
  })
})
