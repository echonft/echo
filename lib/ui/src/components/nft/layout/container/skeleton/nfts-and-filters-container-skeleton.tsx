import { NftFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-filters-container-skeleton'
import { NftsContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nfts-container-skeleton'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/layout/nfts-and-filters-layout'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { type FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilterType>
  btnLabel: string
}

export const NftsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters, btnLabel }) => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainerSkeleton availableFilters={availableFilters} btnLabel={btnLabel} />
      <NftsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
