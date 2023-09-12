import { NftFilter } from '../../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../../nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from './nft-filters-container-skeleton'
import { NftsContainerSkeleton } from './nfts-container-skeleton'
import type { NonEmptyArray } from '@echo/utils/types'
import { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
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
