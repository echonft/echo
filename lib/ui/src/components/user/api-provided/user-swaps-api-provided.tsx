'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Offer } from '@echo/model/types/offer'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SwapRowsContainer } from '@echo/ui/components/swap/layout/swap-rows-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserSwapsEmpty } from '@echo/ui/components/user/swap/empty/user-swaps-empty'
import { NavigationSwaps } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  offers: Offer[]
  user: AuthUser | undefined
}

export const UserSwapsApiProvided: FunctionComponent<Props> = ({ username, offers, user }) => {
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationSwaps} user={user}>
      <HideIfEmpty checks={offers} render={(offers) => <SwapRowsContainer offers={offers} />} />
      <ShowIfEmpty checks={offers}>
        <UserSwapsEmpty username={username} />
      </ShowIfEmpty>
    </UserNavigationLayout>
  )
}
