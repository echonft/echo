import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-filters-container-skeleton'
import { NftsContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nfts-container-skeleton'
import { type NftFilterType } from '@echo/ui/types/nft-filter-type'
import { type FunctionComponent } from 'react'

interface Props {
  availableFilters: NftFilterType[]
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
