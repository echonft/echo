import { nftItemsCollectionSlug } from '@echo/model/helpers/item/nft-items-collection-slug'
import { offerNftItems } from '@echo/model/helpers/offer/offer-nft-items'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function offerItemsCollectionSlug(offer: Offer): Slug[] {
  return pipe(offerNftItems, nftItemsCollectionSlug)(offer)
}
