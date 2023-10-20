import { acceptOfferApiUrl } from '@echo/api/routing/accept-offer-api-url'
import { cancelOfferApiUrl } from '@echo/api/routing/cancel-offer-api-url'
import { rejectOfferApiUrl } from '@echo/api/routing/reject-offer-api-url'
import { type UpdateOfferAction } from '@echo/api/types/update-offer-action'

export function updateOfferApiUrl(offerId: string, action: UpdateOfferAction) {
  switch (action) {
    case 'CANCEL':
      return cancelOfferApiUrl(offerId)
    case 'ACCEPT':
      return acceptOfferApiUrl(offerId)
    case 'REJECT':
      return rejectOfferApiUrl(offerId)
  }
}
