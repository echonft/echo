import { AddMoreButton } from '../../base/add-more-button'
import { NewItemsTitle } from '../../item/new-items-title'
import { NewListingSliderTargetRow } from './new-listing-slider-target-row'
import { ListingTarget } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  targets: ListingTarget[]
  onAddMore?: () => unknown
  onRemove?: (target: ListingTarget) => unknown
}

export const NewListingSliderTargetsContainer: FunctionComponent<Props> = ({ targets, onAddMore }) => {
  const t = useTranslations('listing.new.bottomSlider')
  // TODO Add quantity selector
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewItemsTitle isReceiver />
      <div className={clsx('flex', 'flex-col', 'gap-6', 'w-full')}>
        <>
          {targets.map((target) => (
            <NewListingSliderTargetRow
              collectionName={target.collection.name}
              quantity={1}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              key={target.collection.id}
            />
          ))}
          <div className={clsx('h-40')}>
            <AddMoreButton onClick={onAddMore} title={t('addCollectionBtn')} />
          </div>
        </>
      </div>
    </div>
  )
}
