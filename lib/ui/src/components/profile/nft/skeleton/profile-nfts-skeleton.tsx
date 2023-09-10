import { NavigationItems } from '../../../../constants/navigation-item'
import { NftFilterTraits } from '../../../../constants/nft-filter'
import { NftGroupsAndFiltersContainerSkeleton } from '../../../nft/layout/container/skeleton/nft-group-and-filters-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '../../layout/skeleton/profile-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const ProfileNftsSkeleton: FunctionComponent = () => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} />
    </ProfileNavigationLayoutSkeleton>
  )
}
