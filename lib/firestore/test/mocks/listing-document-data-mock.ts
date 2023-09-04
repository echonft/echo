import { ListingDocumentData } from '../../src/types/model/listing-document-data'
import { getNftCollectionDocumentDataMockById } from './get-nft-collection-document-data-mock-by-id'
import { getNftDocumentDataMockById } from './get-nft-document-data-mock-by-id'

export const listingDocumentDataMock: { [key: string]: ListingDocumentData } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    creatorId: 'oE6yUEQBPn7PZ89yMjKn',
    createdAt: 1676984897,
    creator: {
      id: 'oE6yUEQBPn7PZ89yMjKn',
      discordId: '462798252543049728',
      discordUsername: 'johnnycage#0890',
      discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
      wallet: {
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expiresAt: 2324074781,
    items: [
      { amount: 1, nft: getNftDocumentDataMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftDocumentDataMockById('iRZFKEujarikVjpiFAkE') }
    ],
    itemsNftIds: ['8hHFadIrrooORfTOLkBg', 'iRZFKEujarikVjpiFAkE'],
    offersIds: ['LyCfl6Eg7JKuD7XJ6IPi'],
    state: 'OPEN',
    targets: [
      {
        collection: getNftCollectionDocumentDataMockById('Rc8pLQXxgyQGIRL0fr13'),
        amount: 3
      }
    ],
    targetsIds: ['Rc8pLQXxgyQGIRL0fr13']
  }
}
