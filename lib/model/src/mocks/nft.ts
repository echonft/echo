import { Nft } from '../types/nft'
import { nftCollections } from './nft-collection'
import { users } from './user'

export const nfts: { [key: string]: Nft } = {
  QFjMRNChUAHNswkRADXh: {
    id: 'QFjMRNChUAHNswkRADXh',
    attributes: [{ value: 'Creative', trait: 'Demigod' }],
    balance: 1,
    collection: nftCollections['Rc8pLQXxgyQGIRL0fr13']!,
    description:
      'The personification of the creative force, brought to life by the gods in order to maintain balance within the Universe',
    name: 'Creative Demigod #024',
    owner: users['oE6yUEQBPn7PZ89yMjKn']!,
    pictureUrl: new URL(
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa'
    ),
    thumbnailUrl: new URL(
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa'
    ),
    tokenId: 17,
    tokenType: 'ERC721'
  },
  '8hHFadIrrooORfTOLkBg': {
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
    collection: nftCollections['1aomCtnoesD7WVll6Yi1']!,
    name: 'Spiral Frequencies #1376',
    description: undefined,
    owner: users['oE6yUEQBPn7PZ89yMjKn']!,
    pictureUrl: new URL(
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b'
    ),
    thumbnailUrl: new URL(
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b'
    ),
    tokenId: 1376,
    tokenType: 'ERC721'
  }
}
