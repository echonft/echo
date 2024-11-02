import { nftItems } from '@echo/model/helpers/item/nft-items'
import { offerSenderItems } from '@echo/model/helpers/offer/offer-sender-items'
import type { NftItem } from '@echo/model/types/item'
import { type Offer } from '@echo/model/types/offer'
import { type NonEmptyArray, pipe } from 'ramda'

export function offerSenderNftItems(offer: Pick<Offer, 'senderItems'>): NonEmptyArray<NftItem> {
  return pipe(offerSenderItems, nftItems)(offer)
}
