'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileSwapsEmpty } from '@echo/ui/components/profile/swap/empty/profile-swaps-empty'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offers: OfferWithRole[]
  user: AuthUser
}

export const ProfileSwapsApiProvided: FunctionComponent<Props> = ({ offers, user }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationSwaps} user={user}>
      <HideIfEmpty checks={offers} render={(offers) => <SwapRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <ProfileSwapsEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
