'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserListingsEmpty } from '@echo/ui/components/user/listing/empty/user-listings-empty'
import { NavigationListings } from '@echo/ui/constants/navigation-item'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { Listing } from '@echo/ui/types/model/listing'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  listings: Listing[]
  user: AuthUser | undefined
}

export const UserListingsApiProvided: FunctionComponent<Props> = ({ username, listings, user }) => {
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationListings} user={user}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} />} />
      <ShowIfEmpty checks={listings}>
        <UserListingsEmpty username={username} />
      </ShowIfEmpty>
    </UserNavigationLayout>
  )
}
