import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { nftIsApproved } from '@echo/web3/helpers/nft/nft-is-approved'
import { eqBy, path, pipe, prop, uniqWith } from 'ramda'

export async function assertOfferItemsApproval(offer: Offer, logger?: LoggerInterface): Promise<boolean> {
  if (offer.state === OFFER_STATE_ACCEPTED) {
    const nfts = pipe<[Offer], Nft[], Nft[]>(
      prop('receiverItems'),
      uniqWith(eqBy(path(['collection', 'contract'])))
    )(offer)
    for (const nft of nfts) {
      const approved = await nftIsApproved(nft, logger)
      if (!approved) {
        return false
      }
    }
    return true
  }
  return true
}
