import { eqWithId } from '@echo/model/helpers/eq-with-id'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqNftOwner } from '@echo/model/helpers/nft/eq-nft-owner'
import type { Nft } from '@echo/model/types/nft'
import { getByCollectionNftFilterPredicate } from '@echo/ui/helpers/nft/filters/get-by-collection-nft-filter-predicate'
import { getByTraitsNftFilterPredicate } from '@echo/ui/helpers/nft/filters/get-by-traits-nft-filter-predicate'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
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
import { create } from 'zustand'

interface InitializeArgs {
  nfts: Nft[]
  initialSelection?: {
    nfts?: Nullable<Nft[]>
  }
  sortBy: NftSortBy
}

interface NftsStore {
  source: Nft[]
  initialize: (args: InitializeArgs) => void
  nfts: Nft[] // sorted NFTs without selected ones, unfiltered
  filteredByNfts: {
    byTraits: Nft[]
    byCollection: Nft[]
  }
  selection: {
    collectionFilter: Nullable<CollectionFilter>
    nfts: Nft[]
    traitFilters: TraitFilter[]
  }
  sortFn: (nfts: Nft[]) => Nft[]
  selectNft: (nft: Nft) => void
  unselectNft: (nft: Nft) => void
  toggleTraitFilterSelection: (filter: TraitFilter) => void
  toggleCollectionFilterSelection: (filter: CollectionFilter) => void
}

function selectNft(nft: Nft): (args: NftsStore) => NftsStore {
  return function (args: NftsStore): NftsStore {
    return pipe<[NftsStore], NftsStore, NftsStore>(
      modify<'selection', NftsStore['selection'], NftsStore['selection']>(
        'selection',
        modify('nfts', when<Nft[], Nft[]>(none(eqNft(nft)), append(nft)))
      ),
      onSelectionUpdate
    )(args)
  }
}

function unselectNft(nft: Nft): (args: NftsStore) => NftsStore {
  return function (args: NftsStore): NftsStore {
    const sourceNft = find(eqNft(nft), args.source)
    const addNft = isNil(sourceNft) ? identity : append(sourceNft)
    return pipe<[NftsStore], NftsStore, NftsStore, NftsStore>(
      modify<'nfts', Nft[], Nft[]>('nfts', addNft),
      modify<'selection', NftsStore['selection'], NftsStore['selection']>(
        'selection',
        modify<'nfts', Nft[], Nft[]>('nfts', reject(eqNft(nft)))
      ),
      onSelectionUpdate
    )(args)
  }
}
function onSelectionUpdate(args: NftsStore): NftsStore {
  const { source, sortFn } = args
  const selection = args.selection.nfts
  const selectionFilterFn: (nft: Nft) => boolean = isEmpty(selection)
    ? T
    : eqNftOwner(head(selection as NonEmptyArray<Nft>))
  const sortedNfts = pipe(reject(isInWith(selection, eqNft)), sortFn)(source)
  return pipe<[NftsStore], NftsStore, NftsStore, NftsStore>(
    assoc('nfts', sortedNfts),
    modify<'nfts', Nft[], Nft[]>('nfts', filter(selectionFilterFn)),
    filterNfts
  )(args)
}

function toggleTraitFilterSelection(filter: TraitFilter): (args: NftsStore) => NftsStore {
  return function (args: NftsStore): NftsStore {
    return modifyPath<NftsStore, NftsStore>(
      ['selection', 'traitFilters'],
      ifElse(includesWith(filter, eqWithId), reject(eqWithId(filter)), append(filter)),
      args
    )
  }
}

function toggleCollectionFilterSelection(filter: CollectionFilter): (args: NftsStore) => NftsStore {
  return function (args: NftsStore): NftsStore {
    const newFilter = pipe<[NftsStore], Nullable<CollectionFilter>, Nullable<CollectionFilter>>(
      path(['selection', 'collectionFilter']),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ifElse(either(isNil, complement(eqWithId(filter))), always(filter), always<Nullable<CollectionFilter>>(undefined))
    )(args)
    return pipe<[NftsStore], NftsStore, NftsStore>(
      assocPath(['selection', 'collectionFilter'], newFilter),
      assocPath(['selection', 'traitFilters'], [])
    )(args)
  }
}

function filterNftsByTraits(args: NftsStore): NftsStore {
  const {
    selection: { collectionFilter, traitFilters },
    sortFn
  } = args
  const predicate = getByTraitsNftFilterPredicate(traitFilters)
  if (isNil(predicate)) {
    if (isNil(collectionFilter)) {
      return assocPath(['filteredByNfts', 'byTraits'], args.nfts, args)
    }
    return assocPath(['filteredByNfts', 'byTraits'], args.filteredByNfts.byCollection, args)
  }
  if (isNil(collectionFilter)) {
    return assocPath(['filteredByNfts', 'byTraits'], pipe(filter(predicate), sortFn)(args.nfts), args)
  }
  return assocPath(
    ['filteredByNfts', 'byTraits'],
    pipe(filter(predicate), sortFn)(args.filteredByNfts.byCollection),
    args
  )
}

function filterNftsByCollection(args: NftsStore): NftsStore {
  const {
    selection: { collectionFilter },
    sortFn
  } = args
  if (isNil(collectionFilter)) {
    return assocPath(['filteredByNfts', 'byCollection'], args.nfts, args)
  }
  const predicate = getByCollectionNftFilterPredicate(collectionFilter)
  return assocPath(['filteredByNfts', 'byCollection'], pipe(filter(predicate), sortFn)(args.nfts), args)
}

function filterNfts(args: NftsStore): NftsStore {
  return pipe<[NftsStore], NftsStore, NftsStore>(filterNftsByCollection, filterNftsByTraits)(args)
}

const useNftsStore = create<NftsStore>((set, get) => ({
  source: [],
  nfts: [],
  filteredByNfts: {
    byTraits: [],
    byCollection: []
  },
  selection: {
    collectionFilter: undefined,
    nfts: [],
    traitFilters: []
  },
  sortFn: identity,
  initialize: (args) => {
    const { initialSelection, nfts, sortBy } = args
    const sortFn = sortBy === 'collection' ? sortNftsByCollection : sortNftsByOwner
    if (isEmpty(get().source) || !eqListContentWith(eqNft)(get().source, nfts)) {
      const sortedNfts = sortFn(nfts)
      set(
        pipe(
          assoc('source', nfts),
          assocPath(['selection', 'nfts'], initialSelection?.nfts ?? []),
          assoc('nfts', sortedNfts),
          assocPath(['filteredByNfts', 'byTraits'], sortedNfts),
          assocPath(['filteredByNfts', 'byCollection'], sortedNfts),
          assoc('sortFn', sortFn)
        )
      )
    }
  },
  selectNft: (nft: Nft) => {
    set(selectNft(nft))
  },
  unselectNft: (nft: Nft) => {
    set(unselectNft(nft))
  },
  toggleTraitFilterSelection: (filter: TraitFilter) => {
    set(pipe(toggleTraitFilterSelection(filter), filterNftsByTraits))
  },
  toggleCollectionFilterSelection: (filter: CollectionFilter) => {
    set(pipe(toggleCollectionFilterSelection(filter), filterNfts))
  }
}))

export function useNfts(options: InitializeArgs) {
  const store = useNftsStore()
  store.initialize(options)
  return pipe(dissoc('source'), dissoc('initialize'))(store)
}
