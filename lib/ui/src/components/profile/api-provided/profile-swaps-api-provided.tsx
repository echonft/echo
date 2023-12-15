'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileSwapsEmpty } from '@echo/ui/components/profile/swap/empty/profile-swaps-empty'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
  user: AuthUser
}

export const ProfileSwapsApiProvided: FunctionComponent<Props> = ({ offers, user }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_SWAPS} user={user}>
      <HideIfEmpty checks={offers} render={(offers) => <SwapRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <ProfileSwapsEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
