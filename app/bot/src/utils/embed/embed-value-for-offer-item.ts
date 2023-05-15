import { OfferItem } from '@echo/model'

export function embedValueForOfferItem(item: OfferItem): string {
  return `${item.contract.name ?? item.contract.symbol ?? ''} #${item.tokenId.toString()}`
}
