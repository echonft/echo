import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import type { Offer } from '@echo/model/types/offer'

export async function switchOfferItemsOwners(offer: Offer) {
  const { receiverItems, receiver, senderItems, sender } = offer
  for (const item of receiverItems) {
    await setNftOwner(item.nft.id, sender)
  }
  for (const item of senderItems) {
    await setNftOwner(item.nft.id, receiver)
  }
}
