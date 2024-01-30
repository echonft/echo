import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nft-groups-and-filters-container-skeleton'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { UserNavigationLayoutSkeleton } from '@echo/ui/pages/user/navigation/user-navigation-layout-skeleton'

function render() {
  return (
    <UserNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_NFTS}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NFT_FILTER_TRAITS]} />
    </UserNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
