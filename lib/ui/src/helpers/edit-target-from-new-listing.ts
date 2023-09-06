import { ListingTarget, NewListing } from '@echo/ui-model'
import { always, map, modify, pathEq, pipe, when } from 'ramda'

export function editTargetFromNewListing(targetToEdit: ListingTarget) {
  return function (newListing: NewListing): NewListing {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('targets', map(when(pathEq(targetToEdit.collection.id, ['collection', 'id']), always(targetToEdit))))
    )(newListing)
  }
}
