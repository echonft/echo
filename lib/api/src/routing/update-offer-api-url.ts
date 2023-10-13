import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import { UpdateOfferAction } from '@echo/api/types/update-offer-action'

export function updateOfferApiUrl(offerId: string, action: UpdateOfferAction) {
  switch (action) {
    case 'CANCEL':
      return cancelOfferApiUrl(offerId)
    case 'REJECT':
      return rejectOfferApiUrl(offerId)
    default:
      throw Error('unsupported state')
  }
}
