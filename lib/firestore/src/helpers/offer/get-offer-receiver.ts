import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiver(offer: FirestoreOffer) {
  return pipe(prop('receiverItems'), head, path(['nft', 'owner']))(offer) as FirestoreUserDetails
}
