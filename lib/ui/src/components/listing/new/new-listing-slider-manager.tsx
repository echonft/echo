'use client'
import { editTargetFromNewListing } from '../../../helpers/edit-target-from-new-listing'
import { removeItemFromNewListing } from '../../../helpers/remove-item-from-new-listing'
import { removeTargetFromNewListing } from '../../../helpers/remove-target-from-new-listing'
import { newListingDataState } from '../../../services/state'
import { BottomSlider } from '../../base/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../base/bottom-slider/bottom-slider-title'
import { NewListingSliderInnerContainer } from './new-listing-slider-inner-container'
import { getListingItemsCount, ListingItem, ListingTarget, NftCollection } from '@echo/ui-model'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pipe } from 'ramda'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  collections?: NftCollection[]
}

export const NewListingSliderManager: FunctionComponent<Props> = ({ collections }) => {
  const [newListing, setNewListing] = useRecoilState(newListingDataState)
  const t = useTranslations('listing.new.bottomSlider')

  function onTargetsSelected(newTargets: ListingTarget[]) {
    pipe(assoc('targets'), setNewListing)(newTargets)
  }

  function onEditTarget(newTarget: ListingTarget) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(editTargetFromNewListing, setNewListing)(newTarget)
  }

  function onRemoveTarget(targetToRemove: ListingTarget) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(removeTargetFromNewListing, setNewListing)(targetToRemove)
  }

  function onRemoveItem(itemToRemove: ListingItem) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(removeItemFromNewListing, setNewListing)(itemToRemove)
  }

  function onDismissListing() {
    setNewListing(undefined)
  }

  return (
    <Transition
      show={!isNil(newListing)}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <BottomSlider
        renderTitle={() => <BottomSliderTitle title={t('title')} count={getListingItemsCount(newListing!)} />}
      >
        <NewListingSliderInnerContainer
          items={newListing?.items ?? []}
          targets={newListing?.targets ?? []}
          targetOptions={collections?.map((collection) => ({ collection, amount: 1 }))}
          onTargetsSelected={onTargetsSelected}
          onEditTarget={onEditTarget}
          onRemoveTarget={onRemoveTarget}
          onRemoveItem={onRemoveItem}
          onDismissListing={onDismissListing}
        />
      </BottomSlider>
    </Transition>
  )
}
