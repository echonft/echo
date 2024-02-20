import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nftIsApproved } from '@echo/web3/helpers/nft/nft-is-approved'
import { eqBy, map, path, pipe, prop, uniqWith } from 'ramda'

export async function assertOfferItemsApproval(offer: Offer): Promise<boolean> {
  if (offer.state === OFFER_STATE_ACCEPTED) {
    const nfts = pipe<[Offer], OfferItem[], Nft[], Nft[]>(
      prop('receiverItems'),
      map<OfferItem, Nft>(prop('nft')),
      uniqWith(eqBy(path(['collection', 'contract'])))
    )(offer)
    for (const nft of nfts) {
      const approved = await nftIsApproved(nft)
      if (!approved) {
        return false
      }
    }
    return true
  }
  return true
}
