import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nft-groups-and-filters-container-skeleton'
import { UserNavigationLayoutSkeleton } from '@echo/ui/components/user/layout/skeleton/user-navigation-layout-skeleton'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const UserNftsSkeleton: FunctionComponent = () => {
  const t = useTranslations('user')
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NFT_FILTER_TRAITS]} btnLabel={t('button.label')} />
    </UserNavigationLayoutSkeleton>
  )
}
