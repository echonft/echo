import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_2_ID, NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { getUserMockByUsername, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { toLower } from 'ramda'

export const LISTING_MOCK_ID = 'jUzMtPGKM62mMhEcmbN4'
export const LISTING_MOCK_SLUG = toLower(LISTING_MOCK_ID)
export const listingMock: Record<string, Listing> = {
  jUzMtPGKM62mMhEcmbN4: {
    createdAt: 1676984897,
    creator: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    expiresAt: 2324074781,
    items: [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID), getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)],
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
