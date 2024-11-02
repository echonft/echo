import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import type { NftItem } from '@echo/model/types/item'
import { type Offer } from '@echo/model/types/offer'
import { type NonEmptyArray, pipe } from 'ramda'

export function offerReceiverNftItems(offer: Pick<Offer, 'receiverItems'>): NonEmptyArray<NftItem> {
  return pipe(offerReceiverItems, nftItems)(offer)
}
