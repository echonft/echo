import { NavigationListingsCreated, NavigationListingsReceived } from '../../../../constants/navigation-item'
import { ListingRowsContainerSkeleton } from '../../../listing/layout/container/skeleton/listing-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '../../layout/skeleton/profile-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NavigationListingsCreated | typeof NavigationListingsReceived
}

export const ProfileListingsSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <ListingRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
