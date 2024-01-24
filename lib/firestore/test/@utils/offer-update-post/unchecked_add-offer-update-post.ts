import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReferenceWithId } from '@echo/firestore/helpers/crud/reference/set-reference-with-id'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function unchecked_addOfferUpdatePost(offerUpdateId: string) {
  return pipe(
    getOfferUpdatePostsCollectionReference,
    setReferenceWithId({
      offerUpdateId,
      postedAt: now()
    })
  )()
}
