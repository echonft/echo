import { isUserOfferReceiver } from '../../../helpers/is-user-offer-receiver'
import { OfferDetails } from './offer-details'
import { OfferResponse } from '@echo/api'
import { AuthUser, mapOffer } from '@echo/ui-model'
import { FunctionComponent } from 'react'

interface Props {
  offerResponse: OfferResponse
  user: AuthUser
}

export const OfferDetailsApiProvided: FunctionComponent<Props> = ({ offerResponse, user }) => {
  const offer = mapOffer(offerResponse)
  return <OfferDetails offer={offer} isReceiving={isUserOfferReceiver(user.id, offer.receiver.id)} />
}
