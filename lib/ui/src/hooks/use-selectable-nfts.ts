import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Nft } from '@echo/model/types/nft'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
import type { Selectable } from '@echo/ui/types/selectable'
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
  modify,
  modifyPath,
  none,
  pipe,
  prop,
  reject,
  when
} from 'ramda'
import { create } from 'zustand'

type SelectableNftFilter = (nft: Selectable<Nft>) => boolean

interface SelectableNftStoreInitializeArgs {
  nfts: Nft[]
  initialSelection?: Selectable<Nft>[]
  sortBy: NftSortBy
}

interface SelectableNftStore {
  source: Nft[]
  initialize: (args: SelectableNftStoreInitializeArgs) => void
  byTraitsFilter: Nullable<SelectableNftFilter>
  byCollectionFilter: Nullable<SelectableNftFilter>
  nfts: Selectable<Nft>[] // sorted NFTs without selected ones, unfiltered
  filteredByNfts: {
    byTraits: Selectable<Nft>[]
    byCollection: Selectable<Nft>[]
  }
  selection: Selectable<Nft>[]
  sortBy: NftSortBy
  select: (nft: Selectable<Nft>) => void
  unselect: (nft: Selectable<Nft>) => void
  setByTraitsFilter: (byTraitsFilter: Nullable<SelectableNftFilter>) => void
  setByCollectionFilter: (byCollectionFilter: Nullable<SelectableNftFilter>) => void
}

function unselectNft<T extends Pick<SelectableNftStore, 'source' | 'nfts' | 'selection'>>(
  nft: Selectable<Nft>
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
  const sortFn = args.sortBy === 'collection' ? sortNftsByCollection : sortNftsByOwner
  return modify<'nfts', Selectable<Nft>[], Selectable<Nft>[]>(
    'nfts',
    pipe<[Selectable<Nft>[]], Selectable<Nft>[], Selectable<Nft>[]>(
      reject<Selectable<Nft>>(isInWith(args.selection, eqNft)),
      sortFn
    )
  )(args) as T
}

function filterNftsByTraits<
  T extends Pick<SelectableNftStore, 'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts'>
>(args: T): T {
  const { byTraitsFilter, byCollectionFilter } = args
  if (isNil(byCollectionFilter)) {
    if (isNil(byTraitsFilter)) {
      return assocPath(['filteredByNfts', 'byTraits'], args.nfts, args)
    }
    return modifyPath<T, T>(['filteredByNfts', 'byTraits'], filter(byTraitsFilter), args)
  }
  if (isNil(byTraitsFilter)) {
    return assocPath(['filteredByNfts', 'byTraits'], args.filteredByNfts.byCollection, args)
  }
  return assocPath(['filteredByNfts', 'byTraits'], filter(byTraitsFilter, args.filteredByNfts.byCollection), args)
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

function filterNfts<
  T extends Pick<SelectableNftStore, 'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts'>
>(args: T): T {
  return pipe<[T], T, T>(filterNftsByCollection, filterNftsByTraits)(args)
}

const useSelectableNftsStore = create<SelectableNftStore>((set, get) => ({
  source: [],
  byTraitsFilter: undefined,
  byCollectionFilter: undefined,
  nfts: [],
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
          selection: Selectable<Nft>[]
        },
        SelectableNftStoreInitializeArgs & { selection: Selectable<Nft>[] },
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
  select: (nft: Selectable<Nft>) => {
    set(
      pipe(
        modify<'selection', Selectable<Nft>[], Selectable<Nft>[]>(
          'selection',
          when<Selectable<Nft>[], Selectable<Nft>[]>(none(eqNft(nft)), append(nft))
        ),
        updateNftsFromSelection,
        filterNfts
      )
    )
  },
  unselect: (nft: Selectable<Nft>) => {
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
