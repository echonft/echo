'use client'
import { BottomSlider } from '../../layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../layout/bottom-slider/bottom-slider-title'
import { NewListingSliderInnerContainer } from './new-listing-slider-inner-container'
import { ListingItem, ListingTarget, NftCollection } from '@echo/ui-model'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { assoc, find, isNil, map, pathEq, pipe, reject, when } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  collectionProvider: {
    get: () => Promise<Array<NftCollection>>
  }
  initialTargets?: Array<ListingTarget>
  initialItems?: Array<ListingItem>
  show?: boolean
  onDismiss?: () => unknown
}

export const NewListingSliderManager: FunctionComponent<Props> = ({
  collectionProvider,
  initialTargets,
  initialItems,
  show,
  onDismiss
}) => {
  const [collections, setCollections] = useState<Array<NftCollection>>()
  const [targets, setTargets] = useState<ListingTarget[]>(initialTargets ?? [])
  const [items, setItems] = useState<ListingItem[]>(initialItems ?? [])
  const t = useTranslations('listing.new.bottomSlider')

  useEffect(() => {
    void collectionProvider.get().then(setCollections)
  }, [collectionProvider])

  function onCollectionSelectionChange(selection: Array<NftCollection>) {
    setTargets(
      map((collection) => {
        const target = find(pathEq(collection.id, ['collection', 'id']), targets)
        if (isNil(target)) {
          return {
            amount: 1,
            collection
          }
        }
        return {
          amount: target.amount,
          collection
        }
      }, selection)
    )
  }

  function onTargetAmountChange(targetCollectionId: string, amount: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(map(when(pathEq(targetCollectionId, ['collection', 'id']), assoc('amount', amount))), setTargets)(targets)
  }

  function onRemoveTarget(targetCollectionId: string) {
    pipe(reject(pathEq(targetCollectionId, ['collection', 'id'])), setTargets)(targets)
  }

  function onRemoveItem(itemNftId: string) {
    pipe(reject(pathEq(itemNftId, ['nft', 'id'])), setItems)(items)
  }

  function onDismissListing() {
    setTargets([])
    setItems([])
    onDismiss?.()
  }

  return (
    <Transition
      show={show}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <BottomSlider renderTitle={() => <BottomSliderTitle title={t('title')} count={items.length} />}>
        <NewListingSliderInnerContainer
          items={items}
          targets={targets}
          collections={collections}
          onCollectionSelectionChange={onCollectionSelectionChange}
          onTargetAmountChange={onTargetAmountChange}
          onRemoveTarget={onRemoveTarget}
          onRemoveItem={onRemoveItem}
          onDismissListing={onDismissListing}
        />
      </BottomSlider>
    </Transition>
  )
}
