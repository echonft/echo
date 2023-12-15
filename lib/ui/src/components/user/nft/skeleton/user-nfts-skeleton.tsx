import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-group-and-filters-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const UserNftsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_ITEMS}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NFT_FILTER_TRAITS]} btnLabel={t('user.button.label')} />
    </UserNavigationLayoutSkeleton>
  )
}
