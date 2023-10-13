'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { CollectionNavigationLayout } from '@echo/ui/components/collection/layout/collection-navigation-layout'
import { CollectionListingsEmpty } from '@echo/ui/components/collection/swap/empty/collection-listings-empty'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { NavigationListings } from '@echo/ui/constants/navigation-item'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { Listing } from '@echo/ui/types/model/listing'
import { type FunctionComponent } from 'react'

interface Props {
  collectionSlug: string
  listings: Listing[]
  user: AuthUser | undefined
}

export const CollectionListingsApiProvided: FunctionComponent<Props> = ({ collectionSlug, listings, user }) => {
  return (
    <CollectionNavigationLayout slug={collectionSlug} activeNavigationItem={NavigationListings} user={user}>
      <HideIfEmpty checks={listings} render={(listings) => <ListingRowsContainer listings={listings} />} />
      <ShowIfEmpty checks={listings}>
        <CollectionListingsEmpty />
      </ShowIfEmpty>
    </CollectionNavigationLayout>
  )
}
