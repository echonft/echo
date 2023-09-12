import { NftFilter } from '../../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../../nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from './nft-filters-container-skeleton'
import { NftGroupsContainerSkeleton } from './nft-groups-container-skeleton'
import type { NonEmptyArray } from '@echo/utils/types'
import { FunctionComponent } from 'react'

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
