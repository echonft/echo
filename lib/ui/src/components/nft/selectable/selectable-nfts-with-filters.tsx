'use client'
import type { Nft } from '@echo/model/types/nft'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanelVisibilityManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel-visibility-manager'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNfts, type SelectableNftsProps } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { SelectableNftsActionButton } from '@echo/ui/components/nft/selectable/selectable-nfts-action-button'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { getByCollectionNftFilter } from '@echo/ui/helpers/nft/filters/get-by-collection-nft-filter'
import { getByTraitsNftFilter } from '@echo/ui/helpers/nft/filters/get-by-traits-nft-filter'
import { useSelectableNfts } from '@echo/ui/hooks/use-selectable-nfts'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import type { Selectable } from '@echo/ui/types/selectable'
import { isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SelectableNftsProps, 'action' | 'options' | 'style'> {
  nfts: Selectable<Nft>[]
  sortBy: NftSortBy
  onSelectionAction?: (selection: Selectable<Nft>[]) => void
}

export const SelectableNftsWithFilters: FunctionComponent<Props> = ({
  action,
  options,
  sortBy,
  style,
  nfts,
  onSelectionAction
}) => {
  const { byCollectionFilter, filteredByNfts, setByCollectionFilter, setByTraitsFilter, selection, select, unselect } =
    useSelectableNfts({
      nfts,
      sortBy
    })

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <SelectableNftsActionButton
          action={action}
          count={selection.length}
          onClick={() => {
            onSelectionAction?.(selection)
          }}
        />
        <CollectionFilterPanel
          nfts={nfts}
          onSelect={pipe(getByCollectionNftFilter, setByCollectionFilter)}
          onUnselect={() => {
            setByCollectionFilter(undefined)
          }}
        />
        <TraitFilterPanelVisibilityManager
          show={!isNil(byCollectionFilter)}
          nfts={filteredByNfts.byCollection}
          onSelectionUpdate={pipe(getByTraitsNftFilter, setByTraitsFilter)}
        />
      </NftFiltersPanelsLayout>
      <SelectableNfts
        nfts={filteredByNfts.byTraits}
        selection={selection}
        action={NFT_ACTION_OFFER}
        options={options}
        style={style}
        onAction={(nft) => {
          onSelectionAction?.([nft])
        }}
        onSelect={select}
        onUnselect={unselect}
      />
    </NftsAndFiltersLayout>
  )
}
