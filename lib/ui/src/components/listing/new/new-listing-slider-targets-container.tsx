import { AddMoreButton } from '../../base/add-more-button'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { NewListingSliderTargetRow } from './new-listing-slider-target-row'
import { DirectionIn, ListingTarget } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  targets: ListingTarget[]
  onAddMore?: () => unknown
  onEdit?: (target: ListingTarget) => unknown
  onRemove?: (target: ListingTarget) => unknown
}

export const NewListingSliderTargetsContainer: FunctionComponent<Props> = ({
  targets,
  onAddMore,
  onEdit,
  onRemove
}) => {
  const t = useTranslations('listing.new.bottomSlider')
  const tShared = useTranslations('shared.assets')
  // TODO Add quantity selector
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={DirectionIn} title={tShared('in')} />
      <div className={clsx('flex', 'flex-col', 'gap-6', 'w-full')}>
        <>
          {targets.map((target) => (
            <NewListingSliderTargetRow
              collectionName={target.collection.name}
              quantity={target.amount}
              onQuantityChange={(newQuantity) => onEdit?.(assoc('amount', newQuantity, target))}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              onRemove={() => onRemove?.(target)}
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
