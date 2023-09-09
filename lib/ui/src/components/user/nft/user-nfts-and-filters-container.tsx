'use client'
import { filterNftsByCollection } from '../../../helpers/nft/filter-nfts-by-collection'
import { filterNftsByTraits } from '../../../helpers/nft/filter-nfts-by-traits'
import { CollectionFilter } from '../../../types/collection-filter'
import { NftsByCollectionSelection } from '../../../types/nfts-by-collection-selection'
import { CollectionFilterPanel } from '../../nft/filters/by-collection/collection-filter-panel'
import { TraitFilterPanel } from '../../nft/filters/by-traits/trait-filter-panel'
import { NftFiltersPanelLayout } from '../../nft/layout/nft-filters-panel-layout'
import { UserNftsContainer } from './user-nfts-container'
import { UserOfferButton } from './user-offer-button'
import { Nft, NftTraits } from '@echo/ui-model'
import { isIn, NonEmptyArray, propIsEmpty } from '@echo/utils'
import { clsx } from 'clsx'
import {
  add,
  assoc,
  concat,
  filter,
  findIndex,
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
      <NftFiltersPanelLayout>
        <UserOfferButton
          count={nftSelectionCount}
          onMakeOffer={() => {
            onMakeOffer?.(nftSelection)
          }}
        />
        <CollectionFilterPanel
          nfts={filteredNfts}
          selection={collectionFilterSelection}
          onSelectionUpdate={setCollectionFilterSelection}
        />
        <TraitFilterPanel nfts={filteredNfts} selection={traitSelection} onSelectionUpdate={setTraitSelection} />
      </NftFiltersPanelLayout>
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
