import { type OfferItem } from '@echo/model/types/offer-item'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { describe, expect, it } from '@jest/globals'
import { assocPath, toLower } from 'ramda'

describe('mappers - to-api - mapItemsToRequests', () => {
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
        blurUrl: 'https://echo.xyz',
        collection: {
          id: '1aomCtnoesD7WVll6Yi1',
          bannerUrl: 'https://echo.xyz',
          blurUrl: 'https://echo.xyz',
          contract: {
            tokenType: 'ERC721',
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
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
          verified: false,
          websiteUrl: 'https://echo.xyz'
        },
        name: 'Spiral Frequencies #1376',
        owner: {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: 'johnnycagewins'
          },
          username: 'johnnycagewins',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chainId: 1
          }
        },
        openSeaUrl: 'https://echo.xyz',
        pictureUrl: 'https://echo.xyz',
        tokenId: 1376,
        tokenType: 'ERC721',
        updatedAt: 1676984897
      }
    }
    expect(mapItemsToRequests([offerItem, assocPath(['nft', 'id'], 'offer-item-2', offerItem)])).toStrictEqual([
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
