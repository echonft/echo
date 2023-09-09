import { NavigationItems } from '../../../../constants/navigation-item'
import { NftFilterTraits } from '../../../../constants/nft-filter'
import { NftGroupsAndFiltersContainerSkeleton } from '../../../nft/layout/container/skeleton/nft-group-and-filters-container-skeleton'
import { UserNavigationLayoutSkeleton } from '../../layout/skeleton/user-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

export const UserNftsSkeleton: FunctionComponent = () => {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} />
    </UserNavigationLayoutSkeleton>
  )
}
