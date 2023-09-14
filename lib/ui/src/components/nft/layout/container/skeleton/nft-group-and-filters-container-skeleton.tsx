import { NftFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-filters-container-skeleton'
import { NftGroupsContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-groups-container-skeleton'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import type { NftFilter } from '@echo/ui/types/nft-filter'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import type { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
  btnLabel: string
}

export const NftGroupsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters, btnLabel }) => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainerSkeleton availableFilters={availableFilters} btnLabel={btnLabel} />
      <NftGroupsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
