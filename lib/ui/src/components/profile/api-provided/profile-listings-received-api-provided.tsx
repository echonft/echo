'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { type Listing } from '@echo/model/types/listing'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileListingsReceivedEmpty } from '@echo/ui/components/profile/listing/empty/profile-listings-received-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/navigation/profile-navigation-layout'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
  user: AuthUser | undefined
}

export const ProfileListingsReceivedApiProvided: FunctionComponent<Props> = ({ listings, user }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} user={user} />} />
      <ShowIfEmpty checks={listings}>
        <ProfileListingsReceivedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
