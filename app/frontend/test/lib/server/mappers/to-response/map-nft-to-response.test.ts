import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'
import { mapNftToResponse } from '@server/mappers/to-response/map-nft-to-response'
import { pick } from 'ramda'

describe('mappers - to-response - mapNftToResponse', () => {
  it('converts the object (no undefined props)', () => {
    const nft: FirestoreNft = {
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
      collection: pick(['id', 'name'], getNftCollectionMockById('1aomCtnoesD7WVll6Yi1')),
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
      openSeaUrl: new URL('https://echo.xyz/'),
      pictureUrl: new URL('https://echo.xyz/'),
      thumbnailUrl: new URL('https://echo.xyz/'),
      tokenId: 1376,
      tokenType: 'ERC721'
    }
    const response: NftResponse = {
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
      collection: {
        id: '1aomCtnoesD7WVll6Yi1',
        name: 'Spiral Frequencies'
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
      pictureUrl: 'https://echo.xyz/',
      openSeaUrl: 'https://echo.xyz/',
      thumbnailUrl: 'https://echo.xyz/',
      tokenId: 1376,
      tokenType: 'ERC721'
    }

    expect(mapNftToResponse(nft)).toStrictEqual(response)
  })
})
