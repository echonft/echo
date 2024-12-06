import { OfferError } from '@echo/firestore-functions/constants/errors/offer-error'
import { error } from '@echo/firestore-functions/constants/logger'
import type { ExpireOfferTaskData } from '@echo/firestore-functions/tasks/expire-offer-task'
import { expireOffer } from '@echo/firestore/crud/offer/expire-offer'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import type { Offer } from '@echo/model/types/offer'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, isNil, otherwise, pipe } from 'ramda'

export async function expireOfferTaskRequestHandler(data: ExpireOfferTaskData) {
  const { slug } = withSlugSchema.parse(data)
  const offer = await pipe(getOffer, otherwise(always<Nullable<Offer>>(undefined)))(slug)
  if (!isNil(offer) && !offer.locked) {
    await pipe(
      expireOffer,
      otherwise((err) => {
        error({ err, offer: { slug } }, OfferError.Expire)
      })
    )(slug)
  }
}
