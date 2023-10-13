'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileListingsCreatedEmpty } from '@echo/ui/components/profile/listing/empty/profile-listings-created-empty'
import { NavigationListingsCreated } from '@echo/ui/constants/navigation-item'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { Listing } from '@echo/ui/types/model/listing'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser
}

export const ProfileListingsCreatedApiProvided: FunctionComponent<Props> = ({ listings, user }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationListingsCreated} user={user}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} />} />
      <ShowIfEmpty checks={listings}>
        <ProfileListingsCreatedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
