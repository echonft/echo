import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Offer } from '@echo/model/types/offer/offer'
import { map, pipe, prop } from 'ramda'

export function getOfferReceiverItemsIndexes<T extends Pick<Offer, 'receiverItems'>>(offer: T): NftIndex[] {
  return pipe(prop('receiverItems'), map(nftIndex))(offer)
}
