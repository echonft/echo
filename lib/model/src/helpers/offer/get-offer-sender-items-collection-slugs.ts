import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'
import { pipe, prop } from 'ramda'

export function getOfferSenderItemsCollectionSlugs<T extends Pick<Offer, 'senderItems'>>(offer: T): Slug[] {
  return pipe(prop('senderItems'), getNftsCollectionSlugs)(offer)
}
