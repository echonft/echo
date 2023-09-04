import { ListingTarget, NewListing } from '@echo/ui-model'
import { modify, pathEq, pipe, reject } from 'ramda'

export function removeTargetFromNewListing(targetToRemove: ListingTarget) {
  return function (newListing: NewListing): NewListing {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('targets', reject(pathEq(targetToRemove.collection.id, ['nft', 'id'])))
    )(newListing)
  }
}
