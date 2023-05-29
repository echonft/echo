import { FirestoreNftData } from '../types/model/data/nft/firestore-nft-data'
import { nftCollectionFirestoreData } from './nft-collection-firestore-data'
import { userFirestoreData } from './user-firestore-data'

export const nftFirestoreData: { [key: string]: FirestoreNftData } = {
  QFjMRNChUAHNswkRADXh: {
    refPath: 'nfts/QFjMRNChUAHNswkRADXh',
    id: 'QFjMRNChUAHNswkRADXh',
    attributes: [{ value: 'Creative', trait: 'Demigod' }],
    balance: 1,
    collection: nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!,
    description:
      'The personification of the creative force, brought to life by the gods in order to maintain balance within the Universe',
    name: 'Creative Demigod #024',
    owner: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    pictureUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
    thumbnailUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
    tokenId: 17,
    tokenType: 'ERC721'
  },
  '8hHFadIrrooORfTOLkBg': {
    refPath: 'nfts/8hHFadIrrooORfTOLkBg',
    id: '8hHFadIrrooORfTOLkBg',
    attributes: [{ value: 'archimedean', trait: 'Algorithm' }],
    balance: 1,
    collection: nftCollectionFirestoreData['1aomCtnoesD7WVll6Yi1']!,
    name: 'Spiral Frequencies #1376',
    owner: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    pictureUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    thumbnailUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1376,
    tokenType: 'ERC721'
  }
}
