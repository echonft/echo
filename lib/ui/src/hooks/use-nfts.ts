import { eqWithId } from '@echo/model/helpers/eq-with-id'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { getByCollectionNftFilterPredicate } from '@echo/ui/helpers/nft/filters/get-by-collection-nft-filter-predicate'
import { getByTraitsNftFilterPredicate } from '@echo/ui/helpers/nft/filters/get-by-traits-nft-filter-predicate'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { includesWith } from '@echo/utils/fp/includes-with'
import { isInWith } from '@echo/utils/fp/is-in-with'
import type { Nullable } from '@echo/utils/types/nullable'
import {
  always,
  append,
  assoc,
  assocPath,
  complement,
  dissoc,
  either,
  filter,
  find,
  head,
  identity,
  ifElse,
  isEmpty,
  isNil,
  modify,
  modifyPath,
  none,
  type NonEmptyArray,
  path,
  pipe,
  reject,
  T,
  when
} from 'ramda'
import { useCallback, useState } from 'react'

interface State {
  readonly source: OwnedNft[] // underlying NFTs, unaffected by the selection nor any filters
  readonly nfts: OwnedNft[] // sorted NFTs without selected ones, unfiltered
  readonly filteredByNfts: {
    readonly byTraits: OwnedNft[]
    readonly byCollection: OwnedNft[]
  }
  readonly selection: {
    readonly collectionFilter: Nullable<CollectionFilter>
    readonly nfts: OwnedNft[]
    readonly traitFilters: TraitFilter[]
  }
  readonly sortBy: NftSortBy
}

interface UseNftsArgs {
  readonly nfts: OwnedNft[]
  readonly selection?: {
    readonly nfts?: Nullable<OwnedNft[]>
  }
  readonly sortBy: NftSortBy
}

interface UseNftsReturn extends Omit<State, 'source' | 'sortBy'> {
  readonly selectNft: (nft: OwnedNft) => void
  readonly unselectNft: (nft: OwnedNft) => void
  readonly toggleTraitFilterSelection: (filter: TraitFilter) => void
  readonly toggleCollectionFilterSelection: (filter: CollectionFilter) => void
}

function sort(state: State) {
  if (state.sortBy === 'collection') {
    return sortNftsByCollection
  }
  return sortNftsByOwner
}

function selectNft(nft: OwnedNft): (state: State) => State {
  return function (state: State): State {
    return pipe<[State], State, State>(
      modify<'selection', State['selection'], State['selection']>(
        'selection',
        modify('nfts', when<OwnedNft[], OwnedNft[]>(none(eqNft(nft)), append(nft)))
      ),
      onSelectionUpdate
    )(state)
  }
}

function unselectNft(nft: OwnedNft): (state: State) => State {
  return function (state: State): State {
    const sourceNft = find(eqNft(nft), state.source)
    const addNft = isNil(sourceNft) ? identity : append(sourceNft)
    return pipe<[State], State, State, State>(
      modify<'nfts', OwnedNft[], OwnedNft[]>('nfts', addNft),
      modify<'selection', State['selection'], State['selection']>(
        'selection',
        modify<'nfts', OwnedNft[], OwnedNft[]>('nfts', reject(eqNft(nft)))
      ),
      onSelectionUpdate
    )(state)
  }
}
function onSelectionUpdate(state: State): State {
  const { source } = state
  const selection = state.selection.nfts
  const selectionFilterFn = isEmpty(selection)
    ? T
    : (eqOwnedNftOwner(head(selection as NonEmptyArray<OwnedNft>)) as (nft: Nft) => boolean)
  const sortedNfts = pipe(reject(isInWith(selection, eqNft)), sort(state))(source)
  return pipe<[State], State, State, State>(
    assoc('nfts', sortedNfts),
    modify<'nfts', OwnedNft[], OwnedNft[]>('nfts', filter(selectionFilterFn)),
    filterNfts
  )(state)
}

function toggleTraitFilterSelection(filter: TraitFilter): (state: State) => State {
  return function (state: State): State {
    return modifyPath<State, State>(
      ['selection', 'traitFilters'],
      ifElse(includesWith(filter, eqWithId), reject(eqWithId(filter)), append(filter)),
      state
    )
  }
}

function toggleCollectionFilterSelection(filter: CollectionFilter): (state: State) => State {
  return function (state: State): State {
    const newFilter = pipe<[State], Nullable<CollectionFilter>, Nullable<CollectionFilter>>(
      path(['selection', 'collectionFilter']),
      // the second argument of either(...) can't be typed as a CollectionFilter (vs Nullable<CollectionFilter>),
      // but either is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ifElse(either(isNil, complement(eqWithId(filter))), always(filter), always(undefined))
    )(state)
    return pipe<[State], State, State>(
      assocPath(['selection', 'collectionFilter'], newFilter),
      assocPath(['selection', 'traitFilters'], [])
    )(state)
  }
}

function filterNftsByTraits(state: State): State {
  const {
    selection: { collectionFilter, traitFilters }
  } = state
  const predicate = getByTraitsNftFilterPredicate(traitFilters)
  if (isNil(predicate)) {
    if (isNil(collectionFilter)) {
      return assocPath(['filteredByNfts', 'byTraits'], state.nfts, state)
    }
    return assocPath(['filteredByNfts', 'byTraits'], state.filteredByNfts.byCollection, state)
  }
  if (isNil(collectionFilter)) {
    return assocPath(['filteredByNfts', 'byTraits'], pipe(filter(predicate), sort(state))(state.nfts), state)
  }
  return assocPath(
    ['filteredByNfts', 'byTraits'],
    pipe(filter(predicate), sort(state))(state.filteredByNfts.byCollection),
    state
  )
}

function filterNftsByCollection(state: State): State {
  const {
    selection: { collectionFilter }
  } = state
  if (isNil(collectionFilter)) {
    return assocPath(['filteredByNfts', 'byCollection'], state.nfts, state)
  }
  const predicate = getByCollectionNftFilterPredicate(collectionFilter)
  return assocPath(['filteredByNfts', 'byCollection'], pipe(filter(predicate), sort(state))(state.nfts), state)
}

function filterNfts(state: State): State {
  return pipe<[State], State, State>(filterNftsByCollection, filterNftsByTraits)(state)
}

export const useNfts = (options: UseNftsArgs): UseNftsReturn => {
  const { selection, nfts, sortBy } = options
  const [state, setState] = useState<State>(
    onSelectionUpdate({
      source: nfts,
      nfts: [],
      filteredByNfts: {
        byTraits: [],
        byCollection: []
      },
      selection: {
        collectionFilter: undefined,
        nfts: selection?.nfts ?? [],
        traitFilters: []
      },
      sortBy
    })
  )
  const selectNftCallback = useCallback((nft: OwnedNft) => {
    setState(selectNft(nft))
  }, [])
  const unselectNftCallback = useCallback((nft: OwnedNft) => {
    setState(unselectNft(nft))
  }, [])
  const toggleTraitFilterSelectionCallback = useCallback((filter: TraitFilter) => {
    setState(pipe(toggleTraitFilterSelection(filter), filterNftsByTraits))
  }, [])
  const toggleCollectionFilterSelectionCallback = useCallback((filter: CollectionFilter) => {
    setState(pipe(toggleCollectionFilterSelection(filter), filterNfts))
  }, [])

  return pipe(
    dissoc('source'),
    dissoc('sortBy'),
    assoc('selectNft', selectNftCallback),
    assoc('unselectNft', unselectNftCallback),
    assoc('toggleTraitFilterSelection', toggleTraitFilterSelectionCallback),
    assoc('toggleCollectionFilterSelection', toggleCollectionFilterSelectionCallback)
  )(state)
}
