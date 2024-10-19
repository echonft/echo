import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerItems } from '@echo/model/helpers/offer/offer-items'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { type Offer } from '@echo/model/types/offer/offer'
import { pipe } from 'ramda'

export function offerNftItems(offer: Offer): NftItem[] {
  return pipe(offerItems, nftItems)(offer)
}
