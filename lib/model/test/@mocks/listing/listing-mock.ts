import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { toLower } from 'ramda'

export const LISTING_MOCK_ID = 'jUzMtPGKM62mMhEcmbN4'
export const LISTING_MOCK_SLUG = toLower(LISTING_MOCK_ID)
export const listingMock: Record<string, Listing> = {
  jUzMtPGKM62mMhEcmbN4: {
    createdAt: 1676984897,
    creator: {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'johnnycagewins',
      wallet: {
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
        chain: 'ethereum'
      }
    },
    expiresAt: 2324074781,
    items: [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')],
    readOnly: false,
    slug: LISTING_MOCK_SLUG,
    state: LISTING_STATE_OFFERS_PENDING,
    target: {
      collection: getCollectionMockById(COLLECTION_MOCK_PX_ID),
      amount: 3
    },
    updatedAt: 1676984897
  }
}
