import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { ProfileSwapsEmpty } from '@echo/ui/pages/profile/swaps/profile-swaps-empty'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const ProfileSwaps: FunctionComponent<Props> = ({ offers }) => {
  if (isEmpty(offers)) {
    return <ProfileSwapsEmpty />
  }
  return <OfferCardsContainer offers={offers} options={{ asLink: true }} />
}
