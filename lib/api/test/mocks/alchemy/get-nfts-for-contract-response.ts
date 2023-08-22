import { GetNftResponse } from '@echo/alchemy'

export const mockGetNftsForContractResponse: { [key: string]: GetNftResponse[] } = {
  '0x320e2fa93A4010ba47edcdE762802374bac8d3F7': [
    {
      balance: 1,
      contractAddress: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
      chainId: 1,
      pictureUrl: new URL(
        'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b'
      ),
      thumbnailUrl: new URL(
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b'
      ),
      name: 'Spiral Frequencies #1376',
      tokenId: 1376,
      tokenType: 'ERC721',
      attributes: [
        { value: 'archimedean', trait: 'Algorithm' },
        { value: 'main', trait: 'Ring' },
        { value: 'movie', trait: 'Animation' },
        { value: '5', trait: 'Speed' },
        { value: 'cumulus', trait: 'Density' },
        { value: '0001', trait: 'Colors' },
        { value: 'random1', trait: 'Palette' },
        { value: '#complement', trait: 'Background' }
      ]
    }
  ]
}
