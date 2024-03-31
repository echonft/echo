'use client'
import { withCollectionEquals } from '@echo/ui/comparators/with-collection-equals'
import { withIdEquals } from '@echo/ui/comparators/with-id-equals'
import { CollectionFilterPanel } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanelVisibilityManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel-visibility-manager'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { SelectableNftGroups } from '@echo/ui/components/nft/group/selectable-nft-groups'
import { NftSelectionButton } from '@echo/ui/components/nft/selection/nft-selection-button'
import { filterNftsByCollections } from '@echo/ui/helpers/nft/filter-nfts-by-collections'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filter-nfts-by-traits'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { select } from '@echo/ui/helpers/selectable/select'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { unselect } from '@echo/ui/helpers/selectable/unselect'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Selectable } from '@echo/ui/types/selectable'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { isInWith } from '@echo/utils/fp/is-in-with'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import {
  always,
  append,
  applySpec,
  assoc,
  assocPath,
  converge,
  filter,
  head,
  identity,
  isEmpty,
  isNil,
  map,
  modify,
  none,
  pipe,
  prop,
  reject,
  unless,
  when
} from 'ramda'
import { type FunctionComponent, useReducer } from 'react'

interface State {
  filters: {
    byCollection: Selectable<CollectionFilter>[]
    byTraits: TraitFilterGroup[]
  }
  nfts: SelectableNft[]
  selection: SelectableNft[]
  collapsible: boolean
}
interface StateAction {
  type: 'toggle_collection_filter_selection' | 'toggle_trait_filter_selection' | 'select' | 'unselect'
  nft?: SelectableNft
  collectionFilter?: Selectable<CollectionFilter>
  traitFilter?: Selectable<TraitFilter>
}

interface Props {
  nfts: SelectableNft[]
  onSelectionAction?: (selection: SelectableNft[]) => void
}

export const SelectableNftsWithFilters: FunctionComponent<Props> = ({ nfts, onSelectionAction }) => {
  function rejectSelection(selection: SelectableNft[]): (nfts: SelectableNft[]) => SelectableNft[] {
    return reject<SelectableNft>(isInWith(selection, withIdEquals))
  }
  function filterByCollections(state: State): State {
    const selectedFilters = getSelectionInList(state.filters.byCollection)
    if (isEmpty(selectedFilters)) {
      return pipe<[State], State, State>(assoc('nfts', nfts), assoc('collapsible', true))(state)
    }
    const filteredNfts = filterNftsByCollections<SelectableNft>(selectedFilters)(nfts)
    return pipe<[State], State, State, State, State>(
      modify<'selection', SelectableNft[], SelectableNft[]>('selection', filter(isInWith(filteredNfts, withIdEquals))),
      assoc('nfts', rejectSelection(state.selection)(filteredNfts)),
      assoc('collapsible', false),
      converge<
        State,
        [(state: State) => ['filters', 'byTraits'], (state: State) => TraitFilterGroup[], (state: State) => State]
      >(assocPath, [always(['filters', 'byTraits']), pipe(prop('nfts'), getTraitFiltersForNfts), identity])
    )(state)
  }
  function filterByTraits(state: State): State {
    const selectedCollectionFilters = getSelectionInList(state.filters.byCollection)
    const filteredByCollectionNfts = filterNftsByCollections<SelectableNft>(selectedCollectionFilters)(
      rejectSelection(state.selection)(nfts)
    )
    const filteredNfts = filterNftsByTraits(state.filters.byTraits, filteredByCollectionNfts)
    return assoc('nfts', filteredNfts, state)
  }
  function reducer(state: State, action: StateAction): State {
    switch (action.type) {
      case 'toggle_collection_filter_selection':
        if (isNil(action.collectionFilter)) {
          throw Error(`action should contain collectionFilter`)
        }
        const updatedCollectionFilters = pipe(
          // unselect all other filters
          map(unless(withIdEquals(action.collectionFilter), unselect<CollectionFilter>)),
          // toggle selection of the filter
          toggleSelectionInList(withIdEquals(action.collectionFilter))
        )(state.filters.byCollection)
        return pipe<[State], State, State, State>(
          assocPath(['filters', 'byCollection'], updatedCollectionFilters),
          // if there are no filters selected, clear the selection
          when<State, State>(always(none(isSelected, updatedCollectionFilters)), assoc('selection', [])),
          filterByCollections
        )(state)
      case 'toggle_trait_filter_selection':
        if (isNil(action.traitFilter)) {
          throw Error(`action should contain traitFilter`)
        }
        const updatedTraitsFilterGroups = map<TraitFilterGroup, TraitFilterGroup>(
          modify('filters', toggleSelectionInList(withIdEquals(action.traitFilter))),
          state.filters.byTraits
        )
        return pipe<[State], State, State>(
          assocPath(['filters', 'byTraits'], updatedTraitsFilterGroups),
          filterByTraits
        )(state)
      case 'select':
        if (isNil(action.nft)) {
          throw Error(`action should contain nft`)
        }
        const updatedSelectionState = pipe<[State], State, State>(
          modify('selection', append(action.nft)),
          modify<'nfts', SelectableNft[], SelectableNft[]>('nfts', reject(withIdEquals(action.nft)))
        )(state)
        if (none(isSelected, state.filters.byCollection)) {
          // select the collection filter according to selection
          const collectionFilters = map(
            when(withCollectionEquals(action.nft), select<Selectable<CollectionFilter>>),
            state.filters.byCollection
          )
          return pipe<[State], State, State>(
            assocPath(['filters', 'byCollection'], collectionFilters),
            filterByCollections
          )(updatedSelectionState)
        } else {
          return updatedSelectionState
        }
      case 'unselect':
        if (isNil(action.nft)) {
          throw Error(`action should contain nft`)
        }
        return pipe<[State], State, State, State>(
          modify('nfts', append(action.nft)),
          filterByTraits,
          modify<'selection', SelectableNft[], SelectableNft[]>('selection', reject(withIdEquals(action.nft)))
        )(state)
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    filters: {
      byCollection: getCollectionFiltersForNfts(nfts),
      byTraits: getTraitFiltersForNfts(nfts)
    },
    nfts,
    selection: [],
    collapsible: true
  })

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <NftSelectionButton
          action={head(nfts as NonEmptyArray<SelectableNft>).action}
          count={state.selection.length}
          onClick={() => {
            onSelectionAction?.(state.selection)
          }}
        />
        <CollectionFilterPanel
          filters={state.filters.byCollection}
          onToggleSelection={pipe(
            applySpec<StateAction>({
              type: always<StateAction['type']>('toggle_collection_filter_selection'),
              collectionFilter: identity
            }),
            dispatch
          )}
        />
        <TraitFilterPanelVisibilityManager
          show={!state.collapsible}
          filters={state.filters.byTraits}
          onToggleSelection={pipe(
            applySpec<StateAction>({
              type: always<StateAction['type']>('toggle_trait_filter_selection'),
              traitFilter: identity
            }),
            dispatch
          )}
        />
      </NftFiltersPanelsLayout>
      <SelectableNftGroups
        nfts={state.nfts}
        groupBy={groupNftsByCollection}
        selection={state.selection}
        options={{ owner: { hide: true } }}
        style={{ collapsible: state.collapsible }}
        onAction={(nft: SelectableNft) => {
          onSelectionAction?.([nft])
        }}
        onSelect={pipe(
          applySpec<StateAction>({
            type: always('select'),
            nft: identity
          }),
          dispatch
        )}
        onUnselect={pipe(
          applySpec<StateAction>({
            type: always('unselect'),
            nft: identity
          }),
          dispatch
        )}
      />
    </NftsAndFiltersLayout>
  )
}
