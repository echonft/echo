import { mapNftCollection } from '../../../src/mappers/from-api/map-nft-collection'
import { NftCollectionResponse } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'

describe('', () => {
  it('maps correctly', () => {
    const response: NftCollectionResponse = {
      id: 'Rc8pLQXxgyQGIRL0fr13',
      bannerUrl:
        'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840',
      contract: {
        tokenType: 'ERC721',
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1
      },
      description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
      discordUrl: 'https://discord.gg/pxmythics',
      floorPrice: 0.025,
      name: 'pxMythics Genesis',
      openSeaUrl: 'https://opensea.io/collection/pxmythics-genesis',
      slug: 'pxmythics-genesis',
      profilePictureUrl:
        'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ?w=500&auto=format',
      totalSupply: 1077,
      websiteUrl: 'https://pxmythics.io/'
    }

    expect(mapNftCollection(response)).toStrictEqual({
      id: 'Rc8pLQXxgyQGIRL0fr13',
      bannerUrl: new URL(
        'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840'
      ),
      blurUrl: undefined,
      contract: {
        tokenType: 'ERC721',
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1
      },
      description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
      discordUrl: new URL('https://discord.gg/pxmythics'),
      floorPrice: 0.025,
      name: 'pxMythics Genesis',
      openSeaUrl: new URL('https://opensea.io/collection/pxmythics-genesis'),
      slug: 'pxmythics-genesis',
      profilePictureUrl: new URL(
        'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ?w=500&auto=format'
      ),
      totalSupply: 1077,
      twitterUsername: undefined,
      websiteUrl: new URL('https://pxmythics.io')
    })
  })
})
