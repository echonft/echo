import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { SelectableNftsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nfts-and-filters-container-skeleton'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <SelectableNftsAndFiltersContainerSkeleton availableFilters={[NFT_FILTER_TRAITS]} />
    </CollectionNavigationLayoutSkeleton>
  )
}

export default withLocale(render)
