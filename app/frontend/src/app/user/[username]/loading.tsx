import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayoutSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-page-layout-skeleton'
import { TabsSkeleton } from '@echo/ui/components/base/navigation/skeleton/tabs-skeleton'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import { SelectableNftsActionButtonSkeleton } from '@echo/ui/components/nft/selectable/skeleton/selectable-nfts-action-button-skeleton'
import { UserProfileSkeleton } from '@echo/ui/components/user/profile/skeleton/user-profile-skeleton'

export default function render() {
  return (
    <NavigationPageLayoutSkeleton>
      <SectionLayout>
        <UserProfileSkeleton />
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
    </NavigationPageLayoutSkeleton>
  )
}
