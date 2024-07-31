import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { assoc, modify, pipe } from 'ramda'

/**
 * Swaps the owners of the items in the given offer and returns the updated offer.
 *
 * @param {Offer} offer - The offer object containing the sender, senderItems, receiver, and receiverItems.
 * @return {Offer} - The updated offer object with modified owner values.
 */
export function swapOffer(offer: Offer): Offer {
  return pipe<[Offer], Offer, Offer>(
    modify('senderItems', nonEmptyArrayMap<OwnedNft, OwnedNft>(assoc('owner', offer.receiver))),
    modify('receiverItems', nonEmptyArrayMap<OwnedNft, OwnedNft>(assoc('owner', offer.sender)))
  )(offer)
}
