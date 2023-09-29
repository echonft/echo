import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { describe, expect, it } from '@jest/globals'

describe('mappers - from-api - mapNftFromResponse', () => {
  it('maps correctly', () => {
    const response: NftResponse = {
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: 'https://echo.xyz/',
      collection: {
        id: 'collectionId',
        name: 'collectionName'
      } as CollectionResponse,
      id: 'id',
      name: 'name',
      openSeaUrl: 'https://echo.xyz/',
      owner: {
        discordId: 'discordId',
        discordUsername: 'discordUsername',
        wallet: { address: '0xaddress', chainId: 1 },
        discordAvatar: 'discordAvatar',
        discordBanner: 'discordBanner',
        username: 'discordUsername'
      },
      pictureUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1,
      tokenType: 'ERC721'
    }

    expect(mapNftFromResponse(response)).toStrictEqual({
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: new URL('https://echo.xyz/'),
      collection: {
        id: 'collectionId',
        name: 'collectionName'
      },
      id: 'id',
      name: 'name',
      openSeaUrl: new URL('https://echo.xyz/'),
      owner: {
        discordId: 'discordId',
        discordUsername: 'discordUsername',
        wallet: { address: '0xaddress', chainId: 1 },
        discordAvatar: 'discordAvatar',
        discordBanner: 'discordBanner',
        username: 'discordUsername'
      },
      pictureUrl: new URL('https://echo.xyz/'),
      thumbnailUrl: new URL('https://echo.xyz/'),
      tokenId: 1,
      tokenType: 'ERC721'
    })
  })
})
