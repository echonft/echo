import { mapNft } from '../../../src/lib/server/mappers/to-response/map-nft'
import { getNftCollectionMockById } from '@echo/firestore'
import { Nft, NftCollection } from '@echo/firestore-types'

describe('mappers - to-response - mapNft', () => {
  const collection = {
    id: 'collection-id',
    name: 'collection-name'
  } as NftCollection

  it('removes undefined props', () => {
    const nft: Nft = {
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
      blurUrl: undefined,
      collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1'),
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycage#0890',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        discordBanner: undefined,
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      openSeaUrl: undefined,
      pictureUrl: new URL('https://echo.xyz/'),
      thumbnailUrl: new URL('https://echo.xyz/'),
      tokenId: 1376,
      tokenType: 'ERC721'
    }
    expect(mapNft(nft, collection)).toStrictEqual({
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
      collectionId: 'collection-id',
      collectionName: 'collection-name',
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycage#0890',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      pictureUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1376,
      tokenType: 'ERC721'
    })
  })

  it('converts the object (no undefined props)', () => {
    const nft: Nft = {
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
      blurUrl: new URL('https://echo.xyz/'),
      collection: getNftCollectionMockById('1aomCtnoesD7WVll6Yi1'),
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycage#0890',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        discordBanner: undefined,
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      openSeaUrl: new URL('https://echo.xyz/'),
      pictureUrl: new URL('https://echo.xyz/'),
      thumbnailUrl: new URL('https://echo.xyz/'),
      tokenId: 1376,
      tokenType: 'ERC721'
    }
    expect(mapNft(nft, collection)).toStrictEqual({
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
      blurUrl: 'https://echo.xyz/',
      collectionId: 'collection-id',
      collectionName: 'collection-name',
      name: 'Spiral Frequencies #1376',
      owner: {
        id: 'oE6yUEQBPn7PZ89yMjKn',
        discordId: '462798252543049728',
        discordUsername: 'johnnycage#0890',
        discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
        wallet: {
          address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
          chainId: 1
        }
      },
      pictureUrl: 'https://echo.xyz/',
      openSeaUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1376,
      tokenType: 'ERC721'
    })
  })
})
