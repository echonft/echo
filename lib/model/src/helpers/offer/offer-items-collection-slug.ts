import { nftItems } from '@echo/model/helpers/item/nft-items'
import { nftItemsCollectionSlug } from '@echo/model/helpers/item/nft-items-collection-slug'
import { offerItems } from '@echo/model/helpers/offer/offer-items'
import type { Offer } from '@echo/model/types/offer/offer'
import type { Slug } from '@echo/model/types/slug'
import { pipe } from 'ramda'

export function offerItemsCollectionSlug(offer: Offer): Slug[] {
  return pipe(offerItems, nftItems, nftItemsCollectionSlug)(offer)
}
