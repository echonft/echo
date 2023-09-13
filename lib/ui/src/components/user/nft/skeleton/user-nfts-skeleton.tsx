import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-group-and-filters-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { FunctionComponent } from 'react'

export const UserNftsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} btnLabel={t('user.button.label')} />
    </UserNavigationLayoutSkeleton>
  )
}
