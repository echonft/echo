import { NftCardsContainerSkeleton } from '@echo/ui/components/nft/card/layout/skeleton/nft-cards-container-skeleton'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import NftFiltersPanelSkeletonStories from 'app/storybook/src/nft/filters/nft-filters-panel-skeleton.stories'
import { type FunctionComponent } from 'react'

export const SelectableNftsAndFiltersContainerSkeleton: FunctionComponent = () => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelSkeletonStories />
      <NftCardsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
