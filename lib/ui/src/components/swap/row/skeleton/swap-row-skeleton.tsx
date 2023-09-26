import { ItemThumbnailSkeleton } from '@echo/ui/components/item/thumbnail/skeleton/item-thumbnail-skeleton'
import { OfferItemsContainerLayout } from '@echo/ui/components/offer/layout/offer-items-container-layout'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { SizeLG } from '@echo/ui/constants/size'
import type { FunctionComponent } from 'react'

export const SwapRowSkeleton: FunctionComponent = () => {
  return (
    <SwapRowLayout>
      <OfferItemsContainerLayout>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </OfferItemsContainerLayout>
      <OfferRowSwapIcon />
      <OfferItemsContainerLayout>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </OfferItemsContainerLayout>
    </SwapRowLayout>
  )
}
