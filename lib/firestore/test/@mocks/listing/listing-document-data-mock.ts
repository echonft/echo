import { type ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { toLower } from 'ramda'

export const listingDocumentDataMock: Record<string, ListingDocumentData> = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    createdAt: 1676984897,
    creator: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chainId: 1
      }
    },
    expiresAt: 2324074781,
    items: [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ],
    itemsNftIds: ['8hHFadIrrooORfTOLkBg', 'iRZFKEujarikVjpiFAkE'],
    itemsNftCollectionIds: ['1aomCtnoesD7WVll6Yi1'],
    state: LISTING_STATE_OFFERS_PENDING,
    targets: [
      {
        collection: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'),
        amount: 3
      }
    ],
    targetsIds: ['Rc8pLQXxgyQGIRL0fr13'],
    updatedAt: 1676984897
  }
}
