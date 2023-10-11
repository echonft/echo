'use client'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewListingSlider } from '@echo/ui/components/listing/new/new-listing-slider'
import type { Collection } from '@echo/ui/types/model/collection'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pathEq, pipe, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  collectionProvider: {
    get: () => Promise<Collection[]>
  }
  initialTarget?: ListingTarget
  initialItems?: ListingItem[]
  show?: boolean
  onDismiss?: () => unknown
}

export const NewListingSliderManager: FunctionComponent<Props> = ({
  collectionProvider,
  initialTarget,
  initialItems,
  show,
  onDismiss
}) => {
  const [collections, setCollections] = useState<Collection[]>()
  const [target, setTarget] = useState<ListingTarget | undefined>(initialTarget)
  const [items, setItems] = useState<ListingItem[]>(initialItems ?? [])
  const t = useTranslations('listing.new.bottomSlider')

  useEffect(() => {
    void collectionProvider.get().then(setCollections)
  }, [collectionProvider])

  function onCollectionSelectionChange(selection: Collection | undefined) {
    if (isNil(selection)) {
      setTarget(undefined)
    } else {
      setTarget({ collection: selection, amount: 1 })
    }
  }

  function onTargetAmountChange(_targetCollectionId: string, amount: number) {
    setTarget(assoc('amount', amount))
  }

  function onRemoveTarget(_targetCollectionId: string) {
    setTarget(undefined)
  }

  function onRemoveItem(itemNftId: string) {
    pipe(reject(pathEq(itemNftId, ['nft', 'id'])), setItems)(items)
  }

  function onDismissListing() {
    setTarget(undefined)
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
        <NewListingSlider
          items={items}
          target={target}
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
