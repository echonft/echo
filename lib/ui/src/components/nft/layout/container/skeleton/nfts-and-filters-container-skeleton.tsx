import { NftFilter } from '../../../../../types/nft-filter'
import { NftsAndFiltersLayout } from '../../nfts-and-filters-layout'
import { NftFiltersContainerSkeleton } from './nft-filters-container-skeleton'
import { NftsContainerSkeleton } from './nfts-container-skeleton'
import { NonEmptyArray } from '@echo/utils'
import { FunctionComponent } from 'react'

interface Props {
  availableFilters: NonEmptyArray<NftFilter>
}

export const NftsAndFiltersContainerSkeleton: FunctionComponent<Props> = ({ availableFilters }) => {
  return (
    <NftsAndFiltersLayout>
      <NftFiltersContainerSkeleton availableFilters={availableFilters} />
      <NftsContainerSkeleton />
    </NftsAndFiltersLayout>
  )
}
