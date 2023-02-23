import { OfferItem } from '@echo/model'
import { isEmpty, isNil, join, juxt, map, pipe, prop } from 'ramda'

// TODO This logic might need to be reviewed
export function stringForOfferItems(items: OfferItem[] | undefined): string {
  if (isEmpty(items) || isNil(items)) {
    return 'Any NFT'
  }
  // TODO Should probably sort and group here
  return pipe(map(pipe(juxt([prop('tokenId'), pipe(prop('contract'), prop('address'))]), join('-'))), join(','))(items)
}
