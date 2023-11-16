import { CollectionBanner } from '@echo/ui/components/collection/details/collection-banner'
import { CollectionProfilePicture } from '@echo/ui/components/collection/details/collection-profile-picture'
import { NewListingSliderTargetRowQuantitySelector } from '@echo/ui/components/listing/new/new-listing-slider-target-row-quantity-selector'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  collectionName: string
  quantity: number
  bannerUrl: string | undefined
  pictureUrl: string | undefined
  onQuantityChange?: (newQuantity: number) => unknown
  onRemove?: () => unknown
}

export const NewListingSliderTargetRow: FunctionComponent<Props> = ({
  collectionName,
  quantity,
  bannerUrl,
  pictureUrl,
  onQuantityChange
}) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-40', 'rounded-lg', 'overflow-clip')}>
      {/*<HideIfNil checks={onRemove} render={(onRemove) => <ItemThumbnailSelector onRemove={onRemove} />} />*/}
      <CollectionBanner bannerUrl={bannerUrl} bannerSize={SIZE_MD} />
      <div className={clsx('absolute', 'left-2.5', 'bottom-3')}>
        <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} size={SIZE_MD} />
      </div>
      <div className={clsx('absolute', 'bottom-3', 'right-2')}>
        <NewListingSliderTargetRowQuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
      </div>
    </div>
  )
}
