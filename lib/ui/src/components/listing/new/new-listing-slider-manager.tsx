'use client'
import { removeItemFromNewListing } from '../../../helpers/remove-item-from-new-listing'
import { removeTargetFromNewListing } from '../../../helpers/remove-target-from-new-listing'
import { newListingDataState } from '../../../services/state'
import { BottomSlider } from '../../base/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '../../base/bottom-slider/bottom-slider-title'
import { HideIfNil } from '../../base/hide-if-nil'
import { NewListingSliderInnerContainer } from './new-listing-slider-inner-container'
import { getListingItemsCount, ListingItem, ListingTarget } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

export const NewListingSliderManager: FunctionComponent = () => {
  const [newListing, setNewListing] = useRecoilState(newListingDataState)
  const t = useTranslations('listing.new.bottomSlider')

  const onRemoveItem = (itemToRemove: ListingItem) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNewListing(removeItemFromNewListing(itemToRemove))
  }

  const onRemoveTarget = (targetToRemove: ListingTarget) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNewListing(removeTargetFromNewListing(targetToRemove))
  }
  return (
    <HideIfNil
      checks={newListing}
      render={() => (
        <BottomSlider
          renderTitle={() => <BottomSliderTitle title={t('title')} count={getListingItemsCount(newListing!)} />}
        >
          <NewListingSliderInnerContainer
            items={newListing?.items ?? []}
            targets={newListing?.targets ?? []}
            onRemoveItem={onRemoveItem}
            onRemoveTarget={onRemoveTarget}
          />
        </BottomSlider>
      )}
    ></HideIfNil>
  )
}
