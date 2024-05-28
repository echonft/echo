'use client'
import { eqWithId } from '@echo/model/helpers/eq-with-id'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { type Nft } from '@echo/model/types/nft'
import { TraitFilterPanel } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelsLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panels-layout'
import { NftsAndFiltersLayout } from '@echo/ui/components/nft/filters/layout/nfts-and-filters-layout'
import { NFT_ACTION_LISTING, NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { getNewListingPathFromTarget } from '@echo/ui/helpers/listing/get-new-listing-path-from-target'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filters/filter-nfts-by-traits'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-trait-filters-for-nfts'
import { groupNftsByOwner } from '@echo/ui/helpers/nft/group/group-nfts-by-owner'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { CollectionNftsButton } from '@echo/ui/pages/collection/nfts/collection-nfts-button'
import { CollectionNftsEmpty } from '@echo/ui/pages/collection/nfts/collection-nfts-empty'
import type { Selectable } from '@echo/ui/types/selectable'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { useRouter } from 'next/navigation'
import {
  always,
  append,
  applySpec,
  assoc,
  identity,
  isEmpty,
  isNil,
  map,
  modify,
  partialRight,
  pipe,
  prop,
  reject
} from 'ramda'
import { type FunctionComponent, useReducer } from 'react'

interface Props {
  nfts: Nft[]
  slug: string
}

interface State {
  filters: TraitFilterGroup[]
  nfts: SelectableNft[]
  selection: SelectableNft[]
}

interface StateAction {
  type: 'toggle_filter_selection' | 'select' | 'unselect'
  nft?: SelectableNft
  filter?: Selectable<TraitFilter>
}

export const CollectionNfts: FunctionComponent<Props> = ({ nfts, slug }) => {
  const router = useRouter()

  function rejectSelection(selection: SelectableNft[]): (nfts: SelectableNft[]) => SelectableNft[] {
    return reject<SelectableNft>(isInWith(selection, eqNft))
  }

  function filterByTraits(state: State): State {
    const filteredNfts = pipe(
      prop('filters'),
      partialRight(filterNftsByTraits, [rejectSelection(state.selection)(nfts)])
    )(state)
    return assoc('nfts', filteredNfts, state)
  }

  function reducer(state: State, action: StateAction): State {
    switch (action.type) {
      case 'toggle_filter_selection':
        if (isNil(action.filter)) {
          throw Error(`action should contain filter`)
        }
        return pipe<[State], State, State>(
          modify(
            'filters',
            map<TraitFilterGroup, TraitFilterGroup>(modify('filters', toggleSelectionInList(eqWithId(action.filter))))
          ),
          filterByTraits
        )(state)
      case 'select':
        if (isNil(action.nft)) {
          throw Error(`action should contain nft`)
        }
        return pipe<[State], State, State>(
          modify('selection', append(action.nft)),
          modify<'nfts', SelectableNft[], SelectableNft[]>('nfts', reject(eqNft(action.nft)))
        )(state)
      case 'unselect':
        if (isNil(action.nft)) {
          throw Error(`action should contain nft`)
        }
        return pipe<[State], State, State, State>(
          modify('nfts', append(action.nft)),
          modify<'selection', SelectableNft[], SelectableNft[]>('selection', reject(eqNft(action.nft))),
          filterByTraits
        )(state)
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    filters: getTraitFiltersForNfts(nfts),
    nfts,
    selection: []
  })

  const count = state.selection.length
  const action = count > 0 ? NFT_ACTION_OFFER : NFT_ACTION_LISTING
  const onCreateListing = () => {
    router.push(getNewListingPathFromTarget(slug))
  }

  const onCreateOffer = (nft?: SelectableNft) => {
    if (isNil(nft)) {
      router.push(getNewOfferPath(state.selection))
    } else {
      router.push(getNewOfferPath(nft))
    }
  }

  if (isEmpty(nfts)) {
    return <CollectionNftsEmpty />
  }

  return (
    <NftsAndFiltersLayout>
      <NftFiltersPanelsLayout>
        <CollectionNftsButton
          action={action}
          count={count}
          onClick={() => {
            if (action === NFT_ACTION_OFFER) {
              onCreateOffer()
            } else {
              onCreateListing()
            }
          }}
        />
        <TraitFilterPanel
          filters={state.filters}
          onToggleSelection={pipe(
            applySpec<StateAction>({
              type: always<StateAction['type']>('toggle_filter_selection'),
              filter: identity
            }),
            dispatch
          )}
        />
      </NftFiltersPanelsLayout>
      <SelectableNftGroups
        nfts={state.nfts}
        groupBy={groupNftsByOwner}
        selection={state.selection}
        onAction={onCreateOffer}
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
