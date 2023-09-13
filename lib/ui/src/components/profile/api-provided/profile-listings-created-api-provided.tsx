'use client'
import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { ProfileListingsCreatedEmpty } from '@echo/ui/components/profile/listing/empty/profile-listings-created-empty'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/profile-navigation-layout'
import { NavigationListingsReceived } from '@echo/ui/constants/navigation-item'
import { mapListing } from '@echo/ui/mappers/from-api/map-listing'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: Array<Partial<ListingResponse>>
}

export const ProfileListingsCreatedApiProvided: FunctionComponent<Props> = ({ responses }) => {
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])
  const dataIsEmpty = isEmpty(mappedListings)

  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationListingsReceived}>
      <HideIf condition={dataIsEmpty}>
        <ListingRowsContainer listings={mappedListings} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileListingsCreatedEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
