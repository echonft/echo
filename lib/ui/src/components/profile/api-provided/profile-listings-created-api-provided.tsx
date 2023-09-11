'use client'
import { NavigationListingsReceived } from '../../../constants/navigation-item'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { ListingRowsContainer } from '../../listing/layout/container/listing-rows-container'
import { ProfileListingsCreatedEmpty } from '../listing/empty/profile-listings-created-empty'
import { ProfileNavigationLayout } from '../profile-navigation-layout'
import type { ListingResponse } from '@echo/api/types'
import { mapListing } from '@echo/ui-model'
import { isEmpty, map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

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
