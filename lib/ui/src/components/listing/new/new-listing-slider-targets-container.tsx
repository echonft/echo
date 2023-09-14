import { NewListingSliderAddMoreTargetButton } from '@echo/ui/components/listing/new/new-listing-slider-add-more-target-button'
import { NewListingSliderTargetRow } from '@echo/ui/components/listing/new/new-listing-slider-target-row'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionIn } from '@echo/ui/constants/swap-direction'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  targets: ListingTarget[]
  onAddMore?: () => unknown
  onEdit?: (targetCollectionId: string, amount: number) => unknown
  onRemove?: (targetCollectionId: string) => unknown
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
              onQuantityChange={(newQuantity) => onEdit?.(target.collection.id, newQuantity)}
              pictureUrl={target.collection.profilePictureUrl}
              bannerUrl={target.collection.bannerUrl}
              onRemove={() => onRemove?.(target.collection.id)}
              key={target.collection.id}
            />
          ))}
          <div className={clsx('h-40')}>
            <NewListingSliderAddMoreTargetButton onClick={onAddMore} title={t('addCollectionBtn')} />
          </div>
        </>
      </div>
    </div>
  )
}
