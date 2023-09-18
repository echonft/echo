import { mapNftToOfferItem } from '@echo/ui/mappers/map-nft-to-offer-item'
import { Nft } from '@echo/ui/types/model/nft'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftToOfferItem', () => {
  it('maps correctly', () => {
    const nft = {
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: new URL('https://echo.xyz/'),
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
      id: 'id',
      name: 'name',
      openSeaUrl: new URL('https://echo.xyz/'),
      owner: {
        discordId: 'discordId',
        discordUsername: 'discordUsername',
        id: 'id',
        wallet: { address: '0xaddress', chainId: 1 },
        discordAvatar: 'discordAvatar',
        discordBanner: 'discordBanner'
      },
      pictureUrl: new URL('https://echo.xyz/'),
      thumbnailUrl: new URL('https://echo.xyz/'),
      tokenId: 1,
      tokenType: 'ERC721'
    } as unknown as Nft
    expect(mapNftToOfferItem(nft)).toEqual({ nft, amount: 1 })
  })
})
