import { CardsSkeleton } from '@echo/ui/components/base/card/skeleton/cards-skeleton'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { TabsSkeleton } from '@echo/ui/components/base/navigation/tabs/skeleton/tabs-skeleton'
import { ProfileSkeleton } from '@echo/ui/components/base/profile/skeleton/profile-skeleton'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFilterPanelSkeleton } from '@echo/ui/components/nft/filters/skeleton/nft-filter-panel-skeleton'
import type { FunctionComponent } from 'react'

export const CollectionPageSkeleton: FunctionComponent = () => {
  return (
    <NavigationLayout>
      <SectionLayout>
        <ProfileSkeleton />
      </SectionLayout>
      <NavigationSectionLayout>
        <TabsSkeleton count={3} />
        <NftsAndFiltersLayout>
          <NftFiltersPanelsLayout>
            <NftFilterPanelSkeleton />
          </NftFiltersPanelsLayout>
          <CardsSkeleton />
        </NftsAndFiltersLayout>
      </NavigationSectionLayout>
    </NavigationLayout>
  )
}
