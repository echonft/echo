'use client'
import { TraitFilterPanel } from '../../nft/filters/trait-filter-panel'
import { CollectionFilterPanel } from '../filters/collection-filter-panel'
import { UserOfferButton } from '../user-offer-button'
import { UserNftsContainer } from './user-nfts-container'
import {
  CollectionFilter,
  filterNftsByCollection,
  filterNftsByTraits,
  getCollectionFiltersForNfts,
  getTraitsForNfts,
  Nft,
  NftsByCollectionSelection,
  NftTraits
} from '@echo/ui-model'
import { addToArrayIfNotPresent, isIn, NonEmptyArray, propIsEmpty, removeFromArray } from '@echo/utils'
import { clsx } from 'clsx'
import {
  add,
  assoc,
  concat,
  dissoc,
  equals,
  filter,
  findIndex,
  isEmpty,
  length,
  map,
  modify,
  partialRight,
  pathEq,
  pipe,
  prop,
  reduce,
  reject,
  update
} from 'ramda'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  nfts: NonEmptyArray<Nft>
  onMakeOffer?: (selections: NftsByCollectionSelection[]) => unknown
}

export const UserNftsAndFiltersContainer: FunctionComponent<Props> = ({ nfts, onMakeOffer }) => {
  const [nftSelection, setNftSelection] = useState<NftsByCollectionSelection[]>([])
  const [collectionFilterSelection, setCollectionFilterSelection] = useState<CollectionFilter[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})

  const filteredNfts = useMemo(
    () =>
      pipe(
        partialRight(filterNftsByCollection, [collectionFilterSelection]),
        partialRight(filterNftsByTraits, [traitSelection])
      )(nfts) as NonEmptyArray<Nft>,
    [nfts, collectionFilterSelection, traitSelection]
  )
  const collectionFilters = useMemo(
    () => pipe(partialRight(filterNftsByTraits, [traitSelection]), getCollectionFiltersForNfts)(nfts),
    [nfts, traitSelection]
  )
  const traits = useMemo(
    () => pipe(partialRight(filterNftsByCollection, [collectionFilterSelection]), getTraitsForNfts)(nfts),
    [nfts, collectionFilterSelection]
  )
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const nftSelectionCount = useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => pipe(map(pipe(prop('selection'), length)), reduce(add, 0))(nftSelection),
    [nftSelection]
  ) as number

  // check if the NFT selection is still valid (if selected NFTs are still in the filtered NFTs) when applying new filters
  useEffect(() => {
    const filteredNftsIds = map(prop('id'), filteredNfts)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNftSelection(pipe(map(modify('selection', filter(isIn(filteredNftsIds)))), reject(propIsEmpty('selection'))))
  }, [filteredNfts])

  return (
    <div className={clsx('flex', 'flex-row', 'grow', 'gap-8')}>
      <div className={clsx('flex', 'flex-col', 'gap-4')}>
        <UserOfferButton
          count={nftSelectionCount}
          onMakeOffer={() => {
            onMakeOffer?.(nftSelection)
          }}
        />
        <CollectionFilterPanel
          filters={collectionFilters}
          selection={collectionFilterSelection}
          onSelectionUpdate={(filter, selected) => {
            const newSelection = selected
              ? addToArrayIfNotPresent(collectionFilterSelection, filter, equals)
              : removeFromArray(collectionFilterSelection, filter, equals)
            setCollectionFilterSelection(newSelection)
          }}
        />
        <TraitFilterPanel
          traits={traits}
          onSelectionUpdate={(type, selection) => {
            const newSelection = isEmpty(selection)
              ? dissoc(type, traitSelection)
              : assoc(type, selection, traitSelection)
            setTraitSelection(newSelection)
          }}
        />
      </div>
      <UserNftsContainer
        nfts={filteredNfts}
        onSelectionUpdate={(collectionId, selection) => {
          const index = findIndex(pathEq(collectionId, ['collection', 'id']), nftSelection)
          if (index == -1) {
            setNftSelection(concat([{ collection: { id: collectionId }, selection }]))
          } else {
            const updatedSelection = assoc('selection', selection, nftSelection[index])
            setNftSelection(update(index, updatedSelection, nftSelection))
          }
        }}
      />
    </div>
  )
}
