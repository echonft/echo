'use client'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanelVisibilityManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel-visibility-manager'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
  sortBy: NftSortBy
  cardOptions: NftCardProps['options']
}

export const NftsWithFilters: FunctionComponent<Props> = ({ nfts, cardOptions, sortBy }) => {
  const { filteredByNfts, selection, toggleTraitFilterSelection, toggleCollectionFilterSelection } = useNfts({
    nfts,
    sortBy
  })

  return (
    <div className={clsx('w-full', 'h-max')}>
      <NftsAndFiltersLayout>
        <NftFiltersPanelsLayout>
          <CollectionFilterPanel
            nfts={nfts}
            selection={selection.collectionFilter}
            onToggleSelection={toggleCollectionFilterSelection}
          />
          <TraitFilterPanelVisibilityManager
            show={!isNil(selection.collectionFilter)}
            nfts={filteredByNfts.byCollection}
            selection={selection.traitFilters}
            onToggleSelection={toggleTraitFilterSelection}
          />
        </NftFiltersPanelsLayout>
        <NftCards nfts={filteredByNfts.byTraits} cardOptions={cardOptions} />
      </NftsAndFiltersLayout>
    </div>
  )
}
