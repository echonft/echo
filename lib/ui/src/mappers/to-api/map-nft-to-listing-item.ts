import type { ListingItem } from '@echo/model/types/listing-item'
import { type Nft } from '@echo/model/types/nft'

/**
 * Map an NFT to a ListingItem
 * TODO For now, we simply assign an amount of 1 since we only support ERC721
 * @param nft The NFT for the offer
 * @return OfferListingItemItem
 */
export function mapNftToListingItem(nft: Nft): ListingItem {
  return { nft, amount: 1 }
}
