import { CollectionNftsContainer } from './collection-nfts-container'
import { CollectionOfferButton } from './collection-offer-button'
import { TraitFilterPanel } from './filters/trait-filter-panel'
import { Nft, NftTraits } from '@echo/model'
import { addToArrayIfNotPresent, removeFromArray } from '@echo/utils'
import { clsx } from 'clsx'
import { assoc, dissoc, equals, find, isEmpty, isNil, propEq, reduce } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

export interface CollectionNftsAndFiltersContainerProps {
  nfts: Nft[]
  traits: NftTraits
  isFetchingNfts?: boolean
  onTraitSelectionChanged?: (selection: NftTraits) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionNftsAndFiltersContainer: FunctionComponent<CollectionNftsAndFiltersContainerProps> = ({
  nfts,
  traits,
  isFetchingNfts,
  onTraitSelectionChanged,
  onMakeOfferForNft
}) => {
  const [nftSelection, setNftSelection] = useState<string[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})

  // check if the selection is still valid (if selected NFTs are still in the array) when receiving new NFTs
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
        <CollectionOfferButton count={nftSelection.length} />
        <TraitFilterPanel
          traits={traits}
          onSelectionUpdate={(type, selection) => {
            let newSelection: NftTraits
            if (isEmpty(selection)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              newSelection = dissoc(type, selection)
            } else {
              newSelection = assoc(type, selection, traitSelection)
            }
            setTraitSelection(newSelection)
            onTraitSelectionChanged?.(newSelection)
          }}
        />
      </div>
      <CollectionNftsContainer
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
