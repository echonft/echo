import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import type { NftItem } from '@echo/model/types/item/nft-item'
import { type Offer } from '@echo/model/types/offer/offer'
import { type NonEmptyArray, pipe } from 'ramda'

export function offerReceiverNftItems(offer: Offer): NonEmptyArray<NftItem> {
  return pipe(offerReceiverItems, nftItems)(offer)
}
