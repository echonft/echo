import { OfferState } from '@echo/model/constants/offer-state'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import dayjs from 'dayjs'
import { filter, pipe, prop } from 'ramda'

export function getRedeemableOffers(offers: OfferWithRole[]): OfferWithRole[] {
  const now = dayjs()
  return pipe(
    filter((offer: OfferWithRole) => {
      const expirationDate = dayjs.unix(prop('expiresAt', offer))
      return expirationDate.isBefore(now) || offer.state === OfferState.Cancelled || offer.state === OfferState.Rejected
    })
  )(offers)
}
