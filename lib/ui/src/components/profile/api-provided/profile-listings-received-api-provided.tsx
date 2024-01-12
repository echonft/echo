'use client'
import { type Listing } from '@echo/model/types/listing'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileListingsReceivedEmpty } from '@echo/ui/components/profile/listing/empty/profile-listings-received-empty'
import { NAVIGATION_LISTINGS_RECEIVED } from '@echo/ui/constants/navigation-item'
import { type FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
}

export const ProfileListingsReceivedApiProvided: FunctionComponent<Props> = ({ listings }) => {
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_LISTINGS_RECEIVED}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} />} />
      <ShowIfEmpty checks={listings}>
        <ProfileListingsReceivedEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
