'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsFiltersButton } from '@echo/ui/components/nft/filters/layout/nfts-filters-button'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  selectionCount?: number
  btnLabel: string
  collectionFilters: CollectionFilter[]
  traitFilters: TraitFilter[]
  onButtonClick?: MouseEventHandler
  onTraitSelectionToggle?: (filter: TraitFilter) => unknown
  onCollectionSelectionToggle?: (filter: CollectionFilter) => unknown
}

export const NftFiltersContainer: FunctionComponent<Props> = ({
  collectionFilters,
  traitFilters,
  selectionCount,
  btnLabel,
  onButtonClick,
  onTraitSelectionToggle,
  onCollectionSelectionToggle
}) => {
  return (
    <NftFiltersPanelsLayout>
      <NftsFiltersButton count={selectionCount} label={btnLabel} onClick={onButtonClick} />
      <HideIfEmpty
        checks={collectionFilters}
        render={(collectionFilters) => (
          <CollectionFilterPanel filters={collectionFilters} onToggleSelection={onCollectionSelectionToggle} />
        )}
      ></HideIfEmpty>
      <HideIfEmpty
        checks={traitFilters}
        render={(traitFilters) => (
          <TraitFilterPanel filters={traitFilters} onToggleSelection={onTraitSelectionToggle} />
        )}
      ></HideIfEmpty>
    </NftFiltersPanelsLayout>
  )
}
