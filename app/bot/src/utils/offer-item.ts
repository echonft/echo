import { OfferItem } from '@echo/model'
import { isEmpty, isNil } from 'rambda'

// TODO This logic might need to be reviewed
export function stringForOfferItems(items: OfferItem[] | undefined): string {
  if (isEmpty(items) || isNil(items)) {
    return 'Any NFT'
  }
  // TODO Should probably sort and group here
  return items
    .map((item) => (item.id ? `${item.contractAddress}-${item.id}` : `Any NFT from ${item.contractAddress}`))
    .join(', ')
}
