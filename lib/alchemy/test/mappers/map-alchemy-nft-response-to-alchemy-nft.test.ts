import { mapAlchemyNftResponseToAlchemyNft } from '@echo/alchemy/mappers/map-alchemy-nft-response-to-alchemy-nft'
import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { describe, expect, it } from '@jest/globals'
import { alchemyNftResponseMock } from '@test/mocks/alchemy-nft-response-mock'

describe('mappers - mapAlchemyNftResponseToAlchemyNft', () => {
  it('returns mapped nft collection', () => {
    const expected: AlchemyNft = {
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
      contractAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
      chainId: 1,
      name: 'Spiral Frequencies #1376',
      pictureUrl:
        'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      thumbnailUrl:
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1376,
      tokenType: 'ERC721'
    }
    const response = alchemyNftResponseMock['0x320e2fa93A4010ba47edcdE762802374bac8d3F7:1376']!
    expect(mapAlchemyNftResponseToAlchemyNft(response)).toStrictEqual(expected)
  })
})
