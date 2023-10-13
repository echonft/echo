'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { OfferRowsContainer } from '@echo/ui/components/offer/layout/offer-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileOffersCreatedEmpty } from '@echo/ui/components/profile/offer/empty/profile-offers-created-empty'
import { NavigationOffersCreated } from '@echo/ui/constants/navigation-item'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
  user: AuthUser
}

export const ProfileOffersCreatedApiProvided: FunctionComponent<Props> = ({ offers, user }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationOffersCreated} user={user}>
      <HideIfEmpty checks={offers} render={(offers) => <OfferRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <ProfileOffersCreatedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
