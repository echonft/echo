import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Offer } from '@echo/model/types/offer'
import { nftOwnerIsValid } from '@echo/web3/helpers/nft/nft-owner-is-valid'
import type { OfferValidResult } from '@echo/web3/types/offer-valid-result'
import { map, pipe, prop } from 'ramda'

export async function assertOfferItemsOwnership(offer: Offer): Promise<OfferValidResult> {
  if (offer.readOnly) {
    return { offer }
  }
  const nfts = pipe(getOfferItems, map(prop('nft')))(offer)
  for (const nft of nfts) {
    const valid = await nftOwnerIsValid(nft)
    if (!valid) {
      return {
        offer,
        error: `nft ${nft.collection.slug} #${nft.tokenId} owner is not valid`
      }
    }
  }
  return { offer }
}
