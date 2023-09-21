import { mapOfferItemsToRequests } from '@echo/ui/mappers/to-api/map-offer-items-to-requests'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { describe, expect, it } from '@jest/globals'
import { assocPath } from 'ramda'

describe('mappers - to-api - mapOfferItemsToRequests', () => {
  it('maps correctly', () => {
    const offerItem: OfferItem = {
      amount: 1,
      nft: {
        id: 'offer-item',
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
    expect(mapOfferItemsToRequests([offerItem, assocPath(['nft', 'id'], 'offer-item-2', offerItem)])).toStrictEqual([
      {
        amount: 1,
        nft: {
          id: 'offer-item'
        }
      },
      {
        amount: 1,
        nft: {
          id: 'offer-item-2'
        }
      }
    ])
  })
})
