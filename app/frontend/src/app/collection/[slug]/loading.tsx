import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { TabsSkeleton } from '@echo/ui/components/base/navigation/tabs/skeleton/tabs-skeleton'
import { CollectionDetailsSkeleton } from '@echo/ui/components/collection/details/skeleton/collection-details-skeleton'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import { SelectableNftsActionButtonSkeleton } from '@echo/ui/components/nft/selectable/skeleton/selectable-nfts-action-button-skeleton'

export default function render() {
  return (
    <NavigationLayout>
      <SectionLayout>
        <CollectionDetailsSkeleton />
      </SectionLayout>
      <NavigationSectionLayout>
        <TabsSkeleton count={3} />
        <NftsAndFiltersLayout>
          <NftFiltersPanelsLayout>
            <SelectableNftsActionButtonSkeleton />
            <NftFilterPanelSkeleton />
          </NftFiltersPanelsLayout>
          <CardsSkeleton />
        </NftsAndFiltersLayout>
      </NavigationSectionLayout>
    </NavigationLayout>
  )
}
