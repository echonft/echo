import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { Offer } from '@echo/model/types/offer'
import { assoc, pipe } from 'ramda'

export async function switchOfferItemsOwners(offer: Offer) {
  const { receiverItems, receiver, senderItems, sender } = offer
  for (const item of receiverItems) {
    await pipe(assoc('owner', sender), updateNft)(item)
  }
  for (const item of senderItems) {
    await pipe(assoc('owner', receiver), updateNft)(item)
  }
}
