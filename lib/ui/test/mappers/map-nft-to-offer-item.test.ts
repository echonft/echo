import { mapNftToOfferItem } from '@echo/ui/mappers/map-nft-to-offer-item'
import { Nft } from '@echo/ui/types/model/nft'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { getAddress } from 'viem'

describe('mappers - mapNftToOfferItem', () => {
  it('maps correctly', () => {
    const nft: Nft = {
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: 'https://echo.xyz/',
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
      },
      id: 'id',
      name: 'name',
      openSeaUrl: 'https://echo.xyz/',
      owner: {
        discord: {
          avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
          username: 'johnnycagewins'
        },
        username: 'johnnycagewins',
        wallet: {
          address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1),
          chainId: 1
        }
      },
      pictureUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1,
      tokenType: 'ERC721',
      updatedAt: dayjs.unix(1676984897)
    }
    expect(mapNftToOfferItem(nft)).toEqual({ nft, amount: 1 })
  })
})
