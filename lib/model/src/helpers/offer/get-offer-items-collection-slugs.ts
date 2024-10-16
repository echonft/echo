import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { getOfferItems } from '@echo/model/helpers/offer/get-offer-items'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function getOfferItemsCollectionSlugs<T extends Pick<Offer, 'receiverItems' | 'senderItems'>>(offer: T): Slug[] {
  return pipe(getOfferItems, getNftsCollectionSlugs)(offer)
}
