import { NftDocumentData } from '../../src/types/model/document-data/nft-document-data'
import { nftCollectionDocumentDataMock } from './nft-collection-document-data-mock'
import { nftCollectionReferenceMock } from './nft-collection-reference-mock'
import { userDocumentDataMock } from './user-document-data-mock'
import { userReferenceMock } from './user-reference-mock'

export const nftDocumentDataMock: { [key: string]: NftDocumentData } = {
  '8hHFadIrrooORfTOLkBg': {
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
    blurUrl: 'https://blur.io/asset/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
    collection: nftCollectionReferenceMock['1aomCtnoesD7WVll6Yi1']!,
    collectionName: nftCollectionDocumentDataMock['1aomCtnoesD7WVll6Yi1']!.name,
    name: 'Spiral Frequencies #1376',
    owner: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!,
    ownerWallet: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.wallets![3]!,
    openSeaUrl: 'https://opensea.io/assets/ethereum/0x320e2fa93a4010ba47edcde762802374bac8d3f7/1376',
    pictureUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    thumbnailUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1376,
    tokenType: 'ERC721'
  },
  QFjMRNChUAHNswkRADXh: {
    attributes: [{ value: 'Creative', trait: 'Demigod' }],
    balance: 1,
    collection: nftCollectionReferenceMock['Rc8pLQXxgyQGIRL0fr13']!,
    collectionName: nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!.name,
    name: 'Creative Demigod #024',
    owner: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!,
    ownerWallet: userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']!.wallets![3]!,
    openSeaUrl: 'https://opensea.io/assets/ethereum/0x12c63bbd266db84e117356e664f3604055166cec/17',
    pictureUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
    thumbnailUrl:
      'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c96b4f27dc8dec8a869932f36205bafa',
    tokenId: 17,
    tokenType: 'ERC721'
  }
}
