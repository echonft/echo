import { OfferError } from '@echo/firestore-functions/constants/errors/offer-error'
import { error } from '@echo/firestore-functions/constants/logger'
import type { ExpireOfferTaskData } from '@echo/firestore-functions/tasks/expire-offer-task'
import { expireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { otherwise, pipe } from 'ramda'

export async function expireOfferTaskRequestHandler(data: ExpireOfferTaskData) {
  const { slug } = withSlugSchema.parse(data)
  await pipe(
    expireOffer,
    otherwise((err) => {
      error({ err, offer: { slug } }, OfferError.Expire)
    })
  )(slug)
}
