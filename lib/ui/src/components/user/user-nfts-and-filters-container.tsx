import { CollectionFilter } from '../../types/model/collection-filter'
import { CollectionFilterPanel } from './filters/collection-filter-panel'
import { UserNftsContainer } from './user-nfts-container'
import { UserOfferButton } from './user-offer-button'
import { Nft } from '../../../../ui-model'
import { addToArrayIfNotPresent, removeFromArray } from '@echo/utils'
import { clsx } from 'clsx'
import { equals, find, isEmpty, isNil, propEq, reduce } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

export interface UserNftsAndFiltersContainerProps {
  nfts: Nft[]
  filters: CollectionFilter[]
  isFetchingNfts?: boolean
  onFilterSelectionUpdate?: (selection: CollectionFilter[]) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const UserNftsAndFiltersContainer: FunctionComponent<UserNftsAndFiltersContainerProps> = ({
  nfts,
  filters,
  isFetchingNfts,
  onFilterSelectionUpdate,
  onMakeOfferForNft
}) => {
  const [nftSelection, setNftSelection] = useState<string[]>([])
  const [filterSelection, setFilterSelection] = useState<CollectionFilter[]>([])

  // check if the selection is still valid (if selected NFTs are still in the filtered NFTs) when receiving new NFTs
  useEffect(() => {
    if (!isEmpty(nfts) && !isEmpty(nftSelection)) {
      const reducedSelection = reduce(
        (acc: string[], value: string) => {
          const nft = find(propEq(value, 'id'), nfts)
          if (!isNil(nft)) {
            acc.push(nft.id)
          }
          return acc
        },
        [],
        nftSelection
      )
      if (reducedSelection.length < nftSelection.length) {
        setNftSelection(reducedSelection)
      }
    }
  }, [nfts, nftSelection, setNftSelection])

  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
        <UserOfferButton count={nftSelection.length} />
        <CollectionFilterPanel
          filters={filters}
          onSelectionUpdate={(filter, selected) => {
            const newSelection = selected
              ? addToArrayIfNotPresent(filterSelection, filter, equals)
              : removeFromArray(filterSelection, filter, equals)
            setFilterSelection(newSelection)
            onFilterSelectionUpdate?.(newSelection)
          }}
        />
      </div>
      <UserNftsContainer
        nfts={nfts}
        selection={nftSelection}
        onToggleSelection={(id, selected) => {
          if (selected) {
            setNftSelection(addToArrayIfNotPresent(nftSelection, id, equals))
          } else {
            setNftSelection(removeFromArray(nftSelection, id, equals))
          }
        }}
        onMakeOfferForNft={onMakeOfferForNft}
        isLoading={isFetchingNfts}
      />
    </div>
  )
}
