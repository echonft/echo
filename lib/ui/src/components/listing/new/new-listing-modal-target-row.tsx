import { CollectionBanner } from '@echo/ui/components/collection/details/collection-banner'
import { CollectionProfilePicture } from '@echo/ui/components/collection/details/collection-profile-picture'
import { NewListingModalTargetRowQuantitySelector } from '@echo/ui/components/listing/new/new-listing-modal-target-row-quantity-selector'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  collectionName: string
  quantity: number
  bannerUrl: string | undefined
  pictureUrl: string | undefined
  isMutating?: boolean
  onQuantityChange?: (newQuantity: number) => unknown
}

export const NewListingModalTargetRow: FunctionComponent<Props> = ({
  collectionName,
  quantity,
  bannerUrl,
  pictureUrl,
  isMutating,
  onQuantityChange
}) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-40', 'rounded-lg', 'overflow-clip')}>
      <CollectionBanner bannerUrl={bannerUrl} bannerSize={SIZE_MD} />
      <div className={clsx('absolute', 'left-2.5', 'bottom-3')}>
        <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} />
      </div>
      <div className={clsx('absolute', 'bottom-3', 'right-2')}>
        <NewListingModalTargetRowQuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          isMutating={isMutating}
        />
      </div>
    </div>
  )
}
