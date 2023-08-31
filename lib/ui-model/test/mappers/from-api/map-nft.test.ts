import { mapNft } from '../../../src/mappers/from-api/map-nft'
import { NftResponse } from '@echo/api-public'
import { describe, expect, it } from '@jest/globals'

describe('mappers - from-api - mapNft', () => {
  it('maps non-existent props to undefined props', () => {
    const response: NftResponse = {
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      collectionId: 'collectionId',
      collectionName: 'collectionName',
      id: 'id',
      name: 'name',
      owner: {
        discordId: 'discordId',
        discordUsername: 'discordUsername',
        id: 'id',
        wallet: { address: '0xaddress', chainId: 1 },
        discordAvatar: 'discordAvatar',
        discordBanner: 'discordBanner'
      },
      pictureUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1,
      tokenType: 'ERC721'
    }
    expect(mapNft(response)).toStrictEqual({
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: undefined,
      collectionId: 'collectionId',
      collectionName: 'collectionName',
      id: 'id',
      name: 'name',
      openSeaUrl: undefined,
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
    })
  })

  it('maps all props', () => {
    const response: NftResponse = {
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: 'https://echo.xyz/',
      collectionId: 'collectionId',
      collectionName: 'collectionName',
      id: 'id',
      name: 'name',
      openSeaUrl: 'https://echo.xyz/',
      owner: {
        discordId: 'discordId',
        discordUsername: 'discordUsername',
        id: 'id',
        wallet: { address: '0xaddress', chainId: 1 },
        discordAvatar: 'discordAvatar',
        discordBanner: 'discordBanner'
      },
      pictureUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1,
      tokenType: 'ERC721'
    }
    expect(mapNft(response)).toStrictEqual({
      attributes: [
        { trait: 'trait', value: 'value' },
        { trait: 'trait2', value: 'value2' }
      ],
      balance: 1,
      blurUrl: new URL('https://echo.xyz/'),
      collectionId: 'collectionId',
      collectionName: 'collectionName',
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
    })
  })
})
