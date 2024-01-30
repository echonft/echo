import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/nft-filters-container-skeleton'
import { NftGroupsContainerSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-groups-container-skeleton'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type FunctionComponent } from 'react'

interface Props {
  availableFilters: NftFilterType[]
}

export const NftGroupsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainerSkeleton availableFilters={availableFilters} />
      <NftGroupsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
