import { SizeMD } from '../../../constants/size'
import { HideIfNil } from '../../base/utils/hide-if-nil'
import { CollectionProfilePicture } from '../../collection/details/collection-profile-picture'
import { ItemThumbnailSelector } from '../../item/thumbnail/item-thumbnail-selector'
import { Banner } from '../../shared/banner'
import { NewListingSliderTargetRowQuantitySelector } from './new-listing-slider-target-row-quantity-selector'
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
      <HideIfNil checks={onRemove} render={(onRemove) => <ItemThumbnailSelector onRemove={onRemove} />} />
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
