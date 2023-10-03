'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { FiltersPanelButton } from '@echo/ui/components/nft/layout/filters-panel-button'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/layout/nft-filters-panel-layout'
import { CollectionFilter } from '@echo/ui/types/collection-filter'
import { TraitFilter } from '@echo/ui/types/trait-filter'
import { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  nftSelectionCount: number
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
  nftSelectionCount,
  btnLabel,
  onButtonClick,
  onTraitSelectionToggle,
  onCollectionSelectionToggle
}) => {
  return (
    <NftFiltersPanelLayout>
      <FiltersPanelButton count={nftSelectionCount} label={btnLabel} onClick={onButtonClick} />
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
    </NftFiltersPanelLayout>
  )
}
