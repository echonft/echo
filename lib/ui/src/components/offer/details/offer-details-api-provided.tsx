import type { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import type { FunctionComponent } from 'react'

interface Props {
  offerResponse: Partial<OfferResponse>
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offerResponse, user }) => {
  const offer = mapOfferFromResponse(offerResponse)
  return <OfferDetails offer={offer} isReceiver={user.name === offerResponse.receiver?.username} />
}
