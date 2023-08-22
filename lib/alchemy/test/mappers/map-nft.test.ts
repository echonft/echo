import { mapNft } from '../../src/mappers/map-nft'
import { getNftsResponse } from '../mocks/get-nfts-response'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNft', () => {
  it('returns mapped nft collection', () => {
    const expected = {
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
    const result = mapNft(getNftsResponse['0x320e2fa93A4010ba47edcdE762802374bac8d3F7:1376']!)
    expect(result).toStrictEqual(expected)
    // expect(result.contractAddress.toLowerCase()).toEqual(expected.collection.contract.address)
  })
})
