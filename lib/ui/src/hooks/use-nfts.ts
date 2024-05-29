import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import type { Nft } from '@echo/model/types/nft'
import { sortNftsByCollection } from '@echo/ui/helpers/nft/sort/sort-nfts-by-collection'
import { sortNftsByOwner } from '@echo/ui/helpers/nft/sort/sort-nfts-by-owner'
import type { NftSortBy } from '@echo/ui/types/nft-sort-by'
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

type NftFilter = (nft: Nft) => boolean

interface InitializeArgs {
  nfts: Nft[]
  initialSelection?: Nft[]
  sortBy: NftSortBy
}

interface NftsStore {
  source: Nft[]
  initialize: (args: InitializeArgs) => void
  byTraitsFilter: Nullable<NftFilter>
  byCollectionFilter: Nullable<NftFilter>
  nfts: Nft[] // sorted NFTs without selected ones, unfiltered
  filteredByNfts: {
    byTraits: Nft[]
    byCollection: Nft[]
  }
  selection: Nft[]
  sortBy: NftSortBy
  select: (nft: Nft) => void
  unselect: (nft: Nft) => void
  setByTraitsFilter: (byTraitsFilter: Nullable<NftFilter>) => void
  setByCollectionFilter: (byCollectionFilter: Nullable<NftFilter>) => void
}

function unselectNft<T extends Pick<NftsStore, 'source' | 'nfts' | 'selection'>>(nft: Nft): (args: T) => T {
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

function updateNftsFromSelection<T extends Pick<NftsStore, 'selection' | 'nfts' | 'sortBy'>>(args: T): T {
  const sortFn = args.sortBy === 'collection' ? sortNftsByCollection : sortNftsByOwner
  return modify<'nfts', Nft[], Nft[]>(
    'nfts',
    pipe<[Nft[]], Nft[], Nft[]>(reject<Nft>(isInWith(args.selection, eqNft)), sortFn)
  )(args) as T
}

function filterNftsByTraits<
  T extends Pick<NftsStore, 'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts'>
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

function filterNftsByCollection<T extends Pick<NftsStore, 'nfts' | 'byCollectionFilter' | 'filteredByNfts'>>(
  args: T
): T {
  const { byCollectionFilter } = args
  if (isNil(byCollectionFilter)) {
    return assocPath(['filteredByNfts', 'byCollection'], args.nfts, args)
  }
  return modifyPath<T, T>(['filteredByNfts', 'byCollection'], filter(byCollectionFilter), args)
}

function filterNfts<T extends Pick<NftsStore, 'nfts' | 'byTraitsFilter' | 'byCollectionFilter' | 'filteredByNfts'>>(
  args: T
): T {
  return pipe<[T], T, T>(filterNftsByCollection, filterNftsByTraits)(args)
}

const useNftsStore = create<NftsStore>((set, get) => ({
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
        [InitializeArgs],
        InitializeArgs & {
          selection: Nft[]
        },
        InitializeArgs & { selection: Nft[] },
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
  select: (nft: Nft) => {
    set(
      pipe(
        modify<'selection', Nft[], Nft[]>('selection', when<Nft[], Nft[]>(none(eqNft(nft)), append(nft))),
        updateNftsFromSelection,
        filterNfts
      )
    )
  },
  unselect: (nft: Nft) => {
    set(unselectNft(nft))
  },
  setByTraitsFilter: (byTraitsFilter: Nullable<NftFilter>) => {
    set(pipe(assoc('byTraitsFilter', byTraitsFilter), filterNfts))
  },
  setByCollectionFilter: (byCollectionFilter: Nullable<NftFilter>) => {
    set(pipe(assoc('byCollectionFilter', byCollectionFilter), filterNfts))
  }
}))

export function useNfts(options: InitializeArgs) {
  const store = useNftsStore()
  store.initialize(options)
  return pipe(dissoc('source'), dissoc('initialize'))(store)
}
