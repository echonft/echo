import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { always, map, modify } from 'ramda'

/**
 * Swaps the owners of the items in the given offer and returns the updated offer.
 *
 * @param {Offer} offer - The offer object containing the sender, senderItems, receiver, and receiverItems.
 * @return {Offer} - The updated offer object with modified owner values.
 */
export function swapOffer(offer: Offer): Offer {
  const { sender, senderItems, receiver, receiverItems } = offer
  return {
    ...offer,
    senderItems: map<Nft, Nft>(modify('owner', always(receiver)))(senderItems),
    receiverItems: map<Nft, Nft>(modify('owner', always(sender)))(receiverItems)
  }
}
