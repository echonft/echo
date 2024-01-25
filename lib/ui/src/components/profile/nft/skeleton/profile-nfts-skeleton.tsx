import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nft-groups-and-filters-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/navigation/skeleton/profile-navigation-layout-skeleton'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const ProfileNftsSkeleton: FunctionComponent = () => {
  const t = useTranslations('profile')
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <NftGroupsAndFiltersContainerSkeleton
        availableFilters={[NFT_FILTER_TRAITS]}
        btnLabel={t('listingButton.label')}
      />
    </ProfileNavigationLayoutSkeleton>
  )
}
