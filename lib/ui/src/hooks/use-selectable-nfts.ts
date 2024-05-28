import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Nft } from '@echo/model/types/nft'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { whenNil } from '@echo/utils/fp/when-nil'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import {
  always,
  append,
  assoc,
  assocPath,
  converge,
  dissoc,
  filter,
  find,
  identity,
  isEmpty,
  isNil,
  map,
  modify,
  modifyPath,
  none,
  pipe,
  prop,
  reject,
  when
} from 'ramda'
import { create } from 'zustand'

type SelectableNftSortBy = 'collection' | 'owner'
type SelectableNftFilter = (nft: SelectableNft) => boolean

interface SelectableNftStoreInitializeArgs {
  nfts: Nft[]
  initialSelection?: SelectableNft[]
  sortBy: SelectableNftSortBy
}

interface SelectableNftStore {
  source: Nft[]
  initialize: (args: SelectableNftStoreInitializeArgs) => void
  byTraitsFilter: Nullable<SelectableNftFilter>
  byCollectionFilter: Nullable<SelectableNftFilter>
  nfts: SelectableNft[] // sorted NFTs without selected ones, unfiltered
  filteredNfts: SelectableNft[]
  filteredByNfts: {
    byTraits: SelectableNft[]
    byCollection: SelectableNft[]
  }
  selection: SelectableNft[]
  sortBy: SelectableNftSortBy
  select: (nft: SelectableNft) => void
  unselect: (nft: SelectableNft) => void
  setByTraitsFilter: (byTraitsFilter: Nullable<SelectableNftFilter>) => void
  setByCollectionFilter: (byCollectionFilter: Nullable<SelectableNftFilter>) => void
}

function unselectNft<T extends Pick<SelectableNftStore, 'source' | 'nfts' | 'selection'>>(
  nft: SelectableNft
): (args: T) => T {
  return function (args: T): T {
    const sourceNft = find(eqNft(nft), args.source)
    const addNft = isNil(sourceNft) ? identity : append(sourceNft)
    return pipe<[T], T, T, T, T>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('selection', reject(eqNft(nft))),
      modify('nfts', addNft),
      updateNftsFromSelection,
      filterNfts
    )(args) as T
  }
}

function updateNftsFromSelection<T extends Pick<SelectableNftStore, 'selection' | 'nfts' | 'sortBy'>>(args: T): T {
  const selectionEmpty = isEmpty(args.selection)
  const actionFn = selectionEmpty ? enableAction : disableAction
  const sortFn = args.sortBy === 'collection' ? sortNftsByCollection : sortNftsByOwner
  return modify<'nfts', SelectableNft[], SelectableNft[]>(
    'nfts',
    pipe<[SelectableNft[]], SelectableNft[], SelectableNft[], SelectableNft[]>(
      reject<SelectableNft>(isInWith(args.selection, eqNft)),
      map<SelectableNft, SelectableNft>(actionFn),
      sortFn
    )
  )(args) as T
}

function filterNftsByTraits<T extends Pick<SelectableNftStore, 'nfts' | 'byTraitsFilter' | 'filteredByNfts'>>(
  args: T
): T {
  const { byTraitsFilter } = args
  if (isNil(byTraitsFilter)) {
    return assocPath(['filteredByNfts', 'byTraits'], args.nfts, args)
  }
  return modifyPath<T, T>(['filteredByNfts', 'byTraits'], filter(byTraitsFilter), args)
}

function filterNftsByCollection<T extends Pick<SelectableNftStore, 'nfts' | 'byCollectionFilter' | 'filteredByNfts'>>(
  args: T
): T {
  const { byCollectionFilter } = args
  if (isNil(byCollectionFilter)) {
    return assocPath(['filteredByNfts', 'byCollection'], args.nfts, args)
  }
  return modifyPath<T, T>(['filteredByNfts', 'byCollection'], filter(byCollectionFilter), args)
}

function filterNftsByCollectionAndTraits<
  T extends Pick<
    SelectableNftStore,
    'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts' | 'filteredNfts'
  >
>(args: T): T {
  const { byTraitsFilter, byCollectionFilter } = args
  if (isNil(byTraitsFilter) && isNil(byCollectionFilter)) {
    return assoc('filteredNfts', args.nfts, args) as T
  }
  if (isNil(byTraitsFilter)) {
    return assoc('filteredNfts', args.filteredByNfts.byCollection, args) as T
  }
  if (isNil(byCollectionFilter)) {
    return assoc('filteredNfts', args.filteredByNfts.byTraits, args) as T
  }
  return modify('filteredNfts', pipe(filter(byCollectionFilter), filter(byTraitsFilter)), args) as T
}

function filterNfts<
  T extends Pick<
    SelectableNftStore,
    'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts' | 'filteredNfts'
  >
>(args: T): T {
  return pipe<[T], T, T, T>(filterNftsByTraits, filterNftsByCollection, filterNftsByCollectionAndTraits)(args)
}

const useSelectableNftsStore = create<SelectableNftStore>((set, get) => ({
  source: [],
  byTraitsFilter: undefined,
  byCollectionFilter: undefined,
  nfts: [],
  filteredNfts: [],
  filteredByNfts: {
    byTraits: [],
    byCollection: []
  },
  selection: [],
  sortBy: 'owner',
  initialize: (args) => {
    if (isEmpty(get().source)) {
      const nfts = pipe<
        [SelectableNftStoreInitializeArgs],
        SelectableNftStoreInitializeArgs & {
          selection: SelectableNft[]
        },
        SelectableNftStoreInitializeArgs & { selection: SelectableNft[] },
        Nft[]
      >(
        converge(assoc, [always('selection'), pipe(prop('initialSelection'), whenNil(always([]))), identity]),
        updateNftsFromSelection,
        prop('nfts')
      )(args)
      set(
        pipe(
          assoc('source', args.nfts),
          assoc('nfts', nfts),
          assoc('filteredNfts', nfts),
          assoc('filteredByNfts', { byTraits: nfts, byCollection: nfts }),
          assoc('selection', args.initialSelection ?? []),
          assoc('sortBy', args.sortBy),
          assoc('initialized', true)
        )
      )
    } else {
      // store already initialized, just check if NFTs were updated
      if (!eqListContentWith(eqNft)(get().source, args.nfts)) {
        pinoLogger.info('nfts changed, updating store')
        pinoLogger.info(`source length ${get().source.length}`)
        pinoLogger.info(`args nfts length ${args.nfts.length}`)
        // set(pipe(assoc('nfts', nfts), updateNftsFromSelection, filterNfts))
      }
    }
  },
  select: (nft: SelectableNft) => {
    set(
      pipe(
        modify<'selection', SelectableNft[], SelectableNft[]>(
          'selection',
          when<SelectableNft[], SelectableNft[]>(none(eqNft(nft)), append(nft))
        ),
        updateNftsFromSelection,
        filterNfts
      )
    )
  },
  unselect: (nft: SelectableNft) => {
    set(unselectNft(nft))
  },
  setByTraitsFilter: (byTraitsFilter: Nullable<SelectableNftFilter>) => {
    set(pipe(assoc('byTraitsFilter', byTraitsFilter), filterNfts))
  },
  setByCollectionFilter: (byCollectionFilter: Nullable<SelectableNftFilter>) => {
    set(pipe(assoc('byCollectionFilter', byCollectionFilter), filterNfts))
  }
}))

export function useSelectableNfts(options: SelectableNftStoreInitializeArgs) {
  const store = useSelectableNftsStore()
  store.initialize(options)
  return pipe(dissoc('source'), dissoc('initialize'))(store)
}
