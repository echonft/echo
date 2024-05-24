import { OFFER_STATE_COMPLETED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import {
  NFT_MOCK_PX_CREW_ID,
  NFT_MOCK_SPIRAL_JOHNNY_2_ID,
  NFT_MOCK_SPIRAL_JOHNNY_ID
} from '@echo/model-mocks/nft/nft-mock'
import {
  getUserMockByUsername,
  USER_MOCK_CREW_USERNAME,
  USER_MOCK_JOHNNY_USERNAME
} from '@echo/model-mocks/user/user-mock'
import { toLower } from 'ramda'

export const OFFER_MOCK_TO_JOHNNYCAGE_ID = 'LyCfl6Eg7JKuD7XJ6IPi'
export const OFFER_MOCK_TO_JOHNNYCAGE_SLUG = toLower(OFFER_MOCK_TO_JOHNNYCAGE_ID)
export const OFFER_MOCK_FROM_JOHNNYCAGE_ID = 'ASkFpKoHEHVH0gd69t1G'
export const OFFER_MOCK_FROM_JOHNNYCAGE_SLUG = toLower(OFFER_MOCK_FROM_JOHNNYCAGE_ID)

export const offerMock: Record<string, Offer> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    createdAt: 1676984897,
    expiresAt: 2324074781,
    readOnly: false,
    idContract: '0xTEST',
    receiver: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    receiverItems: [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)],
    sender: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    senderItems: [getNftMockById(NFT_MOCK_PX_CREW_ID)],
    slug: OFFER_MOCK_TO_JOHNNYCAGE_SLUG,
    state: OFFER_STATE_OPEN,
    updatedAt: 1676984897
  },
  ASkFpKoHEHVH0gd69t1G: {
    createdAt: 1676984897,
    expiresAt: 2324074781,
    idContract: '0xTEST',
    receiver: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    readOnly: true,
    receiverItems: [getNftMockById(NFT_MOCK_PX_CREW_ID)],
    sender: getUserMockByUsername(USER_MOCK_JOHNNY_USERNAME),
    senderItems: [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID), getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)],
    slug: OFFER_MOCK_FROM_JOHNNYCAGE_SLUG,
    state: OFFER_STATE_COMPLETED,
    updatedAt: 1676984897
  }
}
