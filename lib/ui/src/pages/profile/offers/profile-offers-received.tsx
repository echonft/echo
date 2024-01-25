import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { ProfileOffersReceivedEmpty } from '@echo/ui/pages/profile/offers/profile-offers-received-empty'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const ProfileOffersReceived: FunctionComponent<Props> = ({ offers }) => {
  if (isEmpty(offers)) {
    return <ProfileOffersReceivedEmpty />
  }
  return <OfferCardsContainer offers={offers} options={{ asLink: true }} />
}
