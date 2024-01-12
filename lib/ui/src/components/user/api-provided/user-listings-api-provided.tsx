'use client'
import { type Listing } from '@echo/model/types/listing'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserListingsEmpty } from '@echo/ui/components/user/listing/empty/user-listings-empty'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  listings: Listing[]
}

export const UserListingsApiProvided: FunctionComponent<Props> = ({ username, listings }) => {
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_LISTINGS}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} />} />
      <ShowIfEmpty checks={listings}>
        <UserListingsEmpty username={username} />
      </ShowIfEmpty>
    </UserNavigationLayout>
  )
}
