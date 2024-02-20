import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Offer } from '@echo/model/types/offer'
import { nftOwnerIsValid } from '@echo/web3/helpers/nft/nft-owner-is-valid'
import { map, pipe, prop } from 'ramda'

export async function assertOfferItemsOwnership(offer: Offer): Promise<boolean> {
  if (offer.readOnly) {
    return true
  }
  const nfts = pipe(getOfferItems, map(prop('nft')))(offer)
  for (const nft of nfts) {
    const valid = await nftOwnerIsValid(nft)
    if (!valid) {
      return false
    }
  }
  return true
}
