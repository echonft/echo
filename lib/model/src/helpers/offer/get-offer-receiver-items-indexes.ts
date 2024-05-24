import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Offer } from '@echo/model/types/offer'
import { map, pipe, prop } from 'ramda'

export function getOfferReceiverItemsIndexes<T extends Pick<Offer, 'receiverItems'>>(offer: T): NftIndex[] {
  return pipe(prop('receiverItems'), map(getNftIndex))(offer)
}
