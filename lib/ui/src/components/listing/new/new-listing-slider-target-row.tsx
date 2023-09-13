import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { CollectionProfilePicture } from '@echo/ui/components/collection/details/collection-profile-picture'
import { ItemThumbnailSelector } from '@echo/ui/components/item/thumbnail/item-thumbnail-selector'
import { NewListingSliderTargetRowQuantitySelector } from '@echo/ui/components/listing/new/new-listing-slider-target-row-quantity-selector'
import { Banner } from '@echo/ui/components/shared/banner'
import { SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

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
