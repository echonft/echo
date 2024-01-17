'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/offer-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/navigation/profile-navigation-layout'
import { OfferCardsContainer } from '@echo/ui/components/offer/layout/offer-cards-container'
import { ProfileOffersReceivedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-received-empty'
import { NAVIGATION_OFFERS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const ProfileOffersReceivedApiProvided: FunctionComponent<Props> = ({ offers }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_OFFERS_RECEIVED}>
      <HideIfEmpty checks={offers} render={(offers) => <OfferCardsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <ProfileOffersReceivedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
