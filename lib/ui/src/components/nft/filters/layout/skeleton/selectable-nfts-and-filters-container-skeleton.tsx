import { NftCardsContainerSkeleton } from '@echo/ui/components/nft/card/layout/skeleton/nft-cards-container-skeleton'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/nft-filters-container-skeleton'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type FunctionComponent } from 'react'

interface Props {
  availableFilters: NftFilterType[]
}

export const SelectableNftsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainerSkeleton availableFilters={availableFilters} />
      <NftCardsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
