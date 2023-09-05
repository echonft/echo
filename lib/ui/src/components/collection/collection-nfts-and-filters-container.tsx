'use client'
import { links } from '../../helpers/links'
import { NavigationPills } from '../base/navigation/navigation-pills'
import { PaddedContainer } from '../layout/padded-container'
import { CollectionNftsContainer } from './collection-nfts-container'
import { CollectionOfferButton } from './collection-offer-button'
import { TraitFilterPanel } from './filters/trait-filter-panel'
import { filterNftsByTraits, NavigationItem, Nft, NftTraits } from '@echo/ui-model'
import { addToArrayIfNotPresent, removeFromArray } from '@echo/utils'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, equals, find, isEmpty, isNil, propEq, reduce } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

export const NAVIGATION_ITEM_IDS = ['items', 'listings', 'swaps']

interface Props {
  collectionSlug: string
  nfts: Nft[]
  traits: NftTraits
  selectedNavigationItemId: (typeof NAVIGATION_ITEM_IDS)[number]
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionNftsAndFiltersContainer: FunctionComponent<Props> = ({
  collectionSlug,
  selectedNavigationItemId,
  nfts,
  traits,
  onMakeOfferForNft
}) => {
  const t = useTranslations('collection.navigation')
  const navigationItems: NavigationItem[] = [
    {
      id: NAVIGATION_ITEM_IDS[0]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[0]!),
      path: links.collection.collectionItemsLink(collectionSlug)
    },
    {
      id: NAVIGATION_ITEM_IDS[1]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[1]!),
      path: links.collection.collectionListingsLink(collectionSlug)
    },
    {
      id: NAVIGATION_ITEM_IDS[2]!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: t(NAVIGATION_ITEM_IDS[2]!),
      path: links.collection.collectionSwapsLink(collectionSlug)
    }
  ]
  const [nftSelection, setNftSelection] = useState<string[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})

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
    <PaddedContainer>
      <div className={'py-12'}>
        <NavigationPills items={navigationItems} selectedItemId={selectedNavigationItemId} />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
        <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
          <CollectionOfferButton count={nftSelection.length} />
          <TraitFilterPanel
            traits={traits}
            onSelectionUpdate={(type, selection) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const newSelection = isEmpty(selection)
                ? dissoc(type, traitSelection)
                : assoc(type, selection, traitSelection)
              setTraitSelection(newSelection)
            }}
          />
        </div>
        <CollectionNftsContainer
          nfts={filterNftsByTraits(nfts, traitSelection)}
          selection={nftSelection}
          onToggleSelection={(id, selected) => {
            if (selected) {
              setNftSelection(addToArrayIfNotPresent(nftSelection, id, equals))
            } else {
              setNftSelection(removeFromArray(nftSelection, id, equals))
            }
          }}
          onMakeOfferForNft={onMakeOfferForNft}
        />
      </div>
    </PaddedContainer>
  )
}
