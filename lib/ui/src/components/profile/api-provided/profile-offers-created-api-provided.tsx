'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/offer-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileOffersCreatedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-created-empty'
import { NAVIGATION_OFFERS_CREATED } from '@echo/ui/constants/navigation-item'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
}

export const ProfileOffersCreatedApiProvided: FunctionComponent<Props> = ({ offers }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_OFFERS_CREATED}>
      <HideIfEmpty checks={offers} render={(offers) => <OfferRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <ProfileOffersCreatedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
