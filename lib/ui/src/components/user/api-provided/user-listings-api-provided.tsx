'use client'
import { NavigationListings } from '../../../constants/navigation-item'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { ListingRowsContainer } from '../../listing/layout/container/listing-rows-container'
import { UserNavigationLayout } from '../layout/user-navigation-layout'
import { UserListingsEmpty } from '../listing/empty/user-listings-empty'
import type { ListingResponse } from '@echo/api/types'
import { mapListing } from '@echo/ui-model'
import { isEmpty, map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: Array<Partial<ListingResponse>>
}

export const UserListingsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const mappedListings = useMemo(() => map(mapListing, responses), [responses])
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
