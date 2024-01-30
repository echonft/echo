import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nft-groups-and-filters-container-skeleton'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/pages/profile/navigation/profile-navigation-layout-skeleton'

function render() {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NFT_FILTER_TRAITS]} />
    </ProfileNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
