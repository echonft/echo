import { NftFilter } from '../../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../../nfts-and-filters-layout'
import { NftContainerSkeleton } from './nft-container-skeleton'
import { NftFiltersContainerSkeleton } from './nft-filters-container-skeleton'
import { NonEmptyArray } from '@echo/utils'
import { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
}

export const NftsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  return (
    <NftsAndFiltersLayout>
      <NftContainerSkeleton />
      <NftFiltersContainerSkeleton availableFilters={availableFilters} />
    </NftsAndFiltersLayout>
  )
}
