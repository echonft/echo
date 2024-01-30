import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { ProfilePendingOffersEmpty } from '@echo/ui/pages/profile/offers/pending/profile-pending-offers-empty'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const ProfilePendingOffers: FunctionComponent<Props> = ({ offers }) => {
  if (isEmpty(offers)) {
    return <ProfilePendingOffersEmpty />
  }
  return <OfferCardsContainer offers={offers} options={{ asLink: true }} />
}
