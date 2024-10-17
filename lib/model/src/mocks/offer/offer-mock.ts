import { OFFER_STATE_COMPLETED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockPxCrewId, nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { type Offer } from '@echo/model/types/offer/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { toLower } from 'ramda'

export function offerMockToJohnnycageId() {
  return 'LyCfl6Eg7JKuD7XJ6IPi'
}
export function offerMockToJohnnycageSlug(): Lowercase<string> {
  return toLower(offerMockToJohnnycageId())
}
export function offerMockFromJohnnycageId() {
  return 'ASkFpKoHEHVH0gd69t1G'
}
export function offerMockFromJohnnycageSlug(): Lowercase<string> {
  return toLower(offerMockFromJohnnycageId())
}

export function offerMock(): Record<string, Offer> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      expiresAt: 2324074781,
      readOnly: false,
      idContract: toLower<HexString>('0xTEST'),
      receiver: getUserMockByUsername(userMockJohnnyUsername()),
      receiverItems: [getNftMockById(nftMockSpiralJohnnyId())],
      sender: getUserMockByUsername(userMockCrewUsername()),
      senderItems: [getNftMockById(nftMockPxCrewId())],
      slug: offerMockToJohnnycageSlug(),
      state: OFFER_STATE_OPEN
    },
    ASkFpKoHEHVH0gd69t1G: {
      expiresAt: 2324074781,
      idContract: toLower<HexString>('0xTEST'),
      receiver: getUserMockByUsername(userMockCrewUsername()),
      readOnly: true,
      receiverItems: [getNftMockById(nftMockPxCrewId())],
      sender: getUserMockByUsername(userMockJohnnyUsername()),
      senderItems: [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())],
      slug: offerMockFromJohnnycageSlug(),
      state: OFFER_STATE_COMPLETED
    }
  }
}
