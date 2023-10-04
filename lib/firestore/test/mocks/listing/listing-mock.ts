import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { getNftMockById } from '@echo/firestore-mocks/nft/get-nft-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/nft-collection/get-nft-collection-mock-by-id'

export const listingMock: Record<string, FirestoreListing> = {
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
        address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
        chainId: 1
      }
    },
    expired: false,
    expiresAt: 2324074781,
    items: [
      { amount: 1, nft: getNftMockById('8hHFadIrrooORfTOLkBg') },
      { amount: 1, nft: getNftMockById('iRZFKEujarikVjpiFAkE') }
    ],
    state: 'OPEN',
    targets: [
      {
        collection: getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13'),
        amount: 3
      }
    ],
    updatedAt: 1676984897
  }
}
