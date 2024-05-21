import { parseAbiParameters } from 'viem'

export function parseOfferItemsAbiParameters() {
  return parseAbiParameters(['struct OfferItem { address tokenAddress; uint256 tokenId; }', 'OfferItem[]'])
}
