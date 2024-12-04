import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import dayjs from 'dayjs'
import { filter, pipe, prop } from 'ramda'

export function getExpiredOffers(offers: OfferWithRole[]): OfferWithRole[] {
  const now = dayjs()
  return pipe(
    filter((offer: OfferWithRole) => {
      const expirationDate = dayjs.unix(prop('expiresAt', offer))
      return expirationDate.isBefore(now)
    })
  )(offers)
}
