import { Banner } from '../../base/banner'
import { CollectionProfilePicture } from '../../collection/collection-profile-picture'
import { ItemThumbnailSelector } from '../../item/item-thumbnail-selector'
import { NewListingSliderTargetRowQuantitySelector } from './new-listing-slider-target-row-quantity-selector'
import { SizeMD } from '@echo/ui-model/dist'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  collectionName: string
  quantity: number
  bannerUrl: URL | undefined
  pictureUrl: URL | undefined
  onQuantityChange?: (newQuantity: number) => unknown
  onRemove?: () => unknown
}

export const NewListingSliderTargetRow: FunctionComponent<Props> = ({
  collectionName,
  quantity,
  bannerUrl,
  pictureUrl,
  onQuantityChange,
  onRemove
}) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-40', 'rounded-lg', 'overflow-clip')}>
      {onRemove && <ItemThumbnailSelector onRemove={onRemove} />}
      <Banner bannerUrl={bannerUrl} bannerSize={SizeMD} />
      <div className={clsx('absolute', 'left-2.5', 'bottom-3')}>
        <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} size={SizeMD} />
      </div>
      <div className={clsx('absolute', 'bottom-3', 'right-2')}>
        <NewListingSliderTargetRowQuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
      </div>
    </div>
  )
}
