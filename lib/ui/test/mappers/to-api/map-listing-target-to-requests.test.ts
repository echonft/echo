import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { ListingTarget } from '@echo/ui/types/model/listing-target'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('mappers - to-api - mapListingTargetToRequest', () => {
  it('throw if the target is undefined', () => {
    expect(() => mapListingTargetToRequest(undefined)).toThrow()
  })
  it('maps correctly', () => {
    const target: ListingTarget = {
      amount: 2,
      collection: {
        id: 'Rc8pLQXxgyQGIRL0fr13',
        bannerUrl:
          'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840',
        contract: {
          tokenType: 'ERC721',
          address: getAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1),
          chainId: 1,
          name: 'Mythics Genesis',
          symbol: 'MGEN'
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
        verified: true,
        websiteUrl: 'https://pxmythics.io/'
      }
    }
    expect(mapListingTargetToRequest(target)).toStrictEqual({
      amount: 2,
      collection: {
        id: 'Rc8pLQXxgyQGIRL0fr13'
      }
    })
  })
})
