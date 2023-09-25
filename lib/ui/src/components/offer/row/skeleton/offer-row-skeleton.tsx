import { ItemThumbnailSkeleton } from '@echo/ui/components/item/thumbnail/skeleton/item-thumbnail-skeleton'
import { OfferItemsContainerLayout } from '@echo/ui/components/offer/layout/offer-items-container-layout'
import { OfferRowSwapContainerLayout } from '@echo/ui/components/offer/layout/offer-row-swap-container-layout'
import { OfferRowHeaderLayout } from '@echo/ui/components/offer/row/layout/offer-row-header-layout'
import { OfferRowLayout } from '@echo/ui/components/offer/row/layout/offer-row-layout'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { OfferRowStatePillSkeleton } from '@echo/ui/components/offer/row/skeleton/offer-row-state-pill-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { SizeLG } from '@echo/ui/constants/size'
import type { FunctionComponent } from 'react'

export const OfferRowSkeleton: FunctionComponent = () => (
  <OfferRowLayout>
    <OfferRowHeaderLayout>
      <OfferRowStatePillSkeleton />
      <UserDiscordTagSkeleton />
    </OfferRowHeaderLayout>
    <OfferRowSwapContainerLayout>
      <OfferItemsContainerLayout>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </OfferItemsContainerLayout>
      <OfferRowSwapIcon />
      <OfferItemsContainerLayout>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </OfferItemsContainerLayout>
    </OfferRowSwapContainerLayout>
  </OfferRowLayout>
)
