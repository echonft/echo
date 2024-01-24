import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function unchecked_addOfferUpdatePost(offerUpdateId: string) {
  return pipe(
    getOfferUpdatePostsCollectionReference,
    setReference({
      offerUpdateId,
      postedAt: now()
    })
  )()
}
