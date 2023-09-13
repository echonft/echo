import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { isUserOfferReceiver } from '@echo/ui/helpers/offer/is-user-offer-receiver'
import { mapOffer } from '@echo/ui/mappers/from-api/map-offer'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import type { FunctionComponent } from 'react'

interface Props {
  offerResponse: Partial<OfferResponse>
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offerResponse, user }) => {
  const offer = mapOffer(offerResponse)
  return <OfferDetails offer={offer} isReceiver={isUserOfferReceiver(user.id, offer.receiver.id)} />
}
