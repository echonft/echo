import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { map, pipe, prop } from 'ramda'

export function getOfferSenderItemsIndexes<T extends Pick<Offer, 'senderItems'>>(offer: T): NftIndex[] {
  return pipe(prop('senderItems'), map(getNftIndex))(offer)
}
