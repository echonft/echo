import { CollectionNavigationLayoutSkeleton } from '@echo/ui/components/collection/layout/skeleton/collection-navigation-layout-skeleton'
import { SelectableNftsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/selectable-nfts-and-filters-container-skeleton'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionNftsSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection')
  return (
    <CollectionNavigationLayoutSkeleton activeNavigationItem={NAVIGATION_ITEMS}>
      <SelectableNftsAndFiltersContainerSkeleton
        availableFilters={[NFT_FILTER_TRAITS]}
        btnLabel={t('button.createListing')}
      />
    </CollectionNavigationLayoutSkeleton>
  )
}
