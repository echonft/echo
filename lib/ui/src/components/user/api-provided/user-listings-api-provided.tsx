'use client'
import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ListingRowsContainer } from '@echo/ui/components/listing/layout/container/listing-rows-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserListingsEmpty } from '@echo/ui/components/user/listing/empty/user-listings-empty'
import { NavigationListings } from '@echo/ui/constants/navigation-item'
import { mapListingFromResponse } from '@echo/ui/mappers/from-api/map-listing-from-response'
import { isEmpty, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: Array<ListingResponse>
}

export const UserListingsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedListings = useMemo(() => map(mapListingFromResponse, responses), [responses])
  const dataIsEmpty = isEmpty(mappedListings)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationListings}>
      <HideIf condition={dataIsEmpty}>
        <ListingRowsContainer listings={mappedListings} />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <UserListingsEmpty username={username} />
      </ShowIf>
    </UserNavigationLayout>
  )
}
