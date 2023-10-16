import type { Nft } from '@echo/model/types/nft'
import type { OfferItem } from '@echo/model/types/offer-item'

/**
 * Map an NFT to an OfferItem
 * TODO For now, we simply assign an amount of 1 since we only support ERC721
 * @param nft The NFT for the offer
 * @return OfferItem
 */
export function mapNftToOfferItem(nft: Nft): OfferItem {
  return { nft, amount: 1 }
}
