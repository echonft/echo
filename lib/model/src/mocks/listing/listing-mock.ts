import { LISTING_STATE_OFFERS_PENDING } from '@echo/model/constants/listing-states'
import { collectionMockPxId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { type Listing } from '@echo/model/types/listing'
import { toLower } from 'ramda'

export function listingMockId() {
  return 'jUzMtPGKM62mMhEcmbN4'
}
export function listingMockSlug(): Lowercase<string> {
  return toLower(listingMockId())
}
export const listingMock: Record<string, Listing> = {
  jUzMtPGKM62mMhEcmbN4: {
    creator: getUserMockByUsername(userMockJohnnyUsername()),
    expiresAt: 2324074781,
    items: [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())],
    readOnly: false,
    slug: listingMockSlug(),
    state: LISTING_STATE_OFFERS_PENDING,
    target: {
      collection: getCollectionMockById(collectionMockPxId()),
      amount: 3
    }
  }
}
