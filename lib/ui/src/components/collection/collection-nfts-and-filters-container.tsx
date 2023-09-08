'use client'
import { links } from '../../constants/links'
import { NavigationPills } from '../base/navigation/navigation-pills'
import { PaddedContainer } from '../layout/padded-container'
import { TraitFilterPanel } from '../nft/filters/trait-filter-panel'
import { CollectionNftsContainer } from './collection-nfts-container'
import { CollectionOfferButton } from './collection-offer-button'
import { filterNftsByTraits, NavigationItem, Nft, NftTraits, User } from '@echo/ui-model'
import { filterNftsByOwner } from '@echo/ui-model/src/helpers/filter-nfts-by-owner'
import { addToArrayIfNotPresent, removeFromArray } from '@echo/utils'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, equals, find, head, isEmpty, isNil, partialRight, pipe, prop, propEq, reduce } from 'ramda'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

interface Props {
  collectionSlug: string
  nfts: Nft[]
  traits: NftTraits
  onMakeOfferForNft?: (id: string) => unknown
}

export const CollectionNftsAndFiltersContainer: FunctionComponent<Props> = ({
  collectionSlug,
  nfts,
  traits,
  onMakeOfferForNft
}) => {
  const t = useTranslations('collection.navigation')
  const navigationItems: NavigationItem[] = [
    {
      id: 'items',
      name: t('items'),
      path: links.collection.collectionItemsLink(collectionSlug)
    },
    {
      id: 'listings',
      name: t('listings'),
      path: links.collection.collectionListingsLink(collectionSlug)
    },
    {
      id: 'swaps',
      name: t('swaps'),
      path: links.collection.collectionSwapsLink(collectionSlug)
    }
  ]
  const [nftSelection, setNftSelection] = useState<string[]>([])
  const [traitSelection, setTraitSelection] = useState<NftTraits>({})
  const filteredNfts = useMemo(() => {
    let owner: User | undefined = undefined
    if (!isEmpty(nftSelection)) {
      const nftId = head(nftSelection)
      owner = pipe(find(propEq(nftId, 'id')), prop('owner'))(nfts)
    }
    return pipe(partialRight(filterNftsByTraits, [traitSelection]), partialRight(filterNftsByOwner, [owner]))(nfts)
  }, [nfts, traitSelection, nftSelection])

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
        <NavigationPills items={navigationItems} selectedItemId={'items'} />
      </div>
      <div className={clsx('flex', 'flex-row', 'grow', 'gap-8')}>
        <div className={clsx('flex', 'flex-col', 'gap-4')}>
          <CollectionOfferButton count={nftSelection.length} />
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
        <CollectionNftsContainer
          nfts={filteredNfts}
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
