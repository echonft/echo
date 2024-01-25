import { OfferCardsContainer } from '@echo/ui/components/offer/card/layout/offer-cards-container'
import { UserSwapsEmpty } from '@echo/ui/pages/user/swaps/user-swaps-empty'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  offers: OfferWithRole[]
}

export const UserSwaps: FunctionComponent<Props> = ({ username, offers }) => {
  if (isEmpty(offers)) {
    return <UserSwapsEmpty username={username} />
  }
  return <OfferCardsContainer offers={offers} options={{ asLink: true }} />
}
