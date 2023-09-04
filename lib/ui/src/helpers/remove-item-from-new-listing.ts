import { ListingItem, NewListing } from '@echo/ui-model'
import { modify, pathEq, pipe, reject } from 'ramda'

export function removeItemFromNewListing(itemToRemove: ListingItem) {
  return function (newListing: NewListing): NewListing {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('items', reject(pathEq(itemToRemove.nft.id, ['nft', 'id'])))
    )(newListing)
  }
}
