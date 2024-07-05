import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { assoc, map, modify, pipe } from 'ramda'

/**
 * Swaps the owners of the items in the given offer and returns the updated offer.
 *
 * @param {Offer} offer - The offer object containing the sender, senderItems, receiver, and receiverItems.
 * @return {Offer} - The updated offer object with modified owner values.
 */
export function swapOffer(offer: Offer): Offer {
  return pipe<[Offer], Offer, Offer>(
    modify('senderItems', map<Nft, Nft>(assoc('owner', offer.receiver))),
    modify('receiverItems', map<Nft, Nft>(assoc('owner', offer.sender)))
  )(offer)
}
