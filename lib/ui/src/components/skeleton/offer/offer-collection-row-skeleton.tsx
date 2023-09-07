import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { OfferItemThumbnailSkeleton } from '../offer-item/offer-item-thumbnail-skeleton'
import { OfferStatePillSkeleton } from './offer-state-pill-skeleton'
import { DirectionLeft, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferCollectionRowSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
    <OfferStatePillSkeleton />
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-2')}>
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <OfferItemThumbnailSkeleton size={SizeLG} />
        <OfferItemThumbnailSkeleton size={SizeLG} />
      </div>
      <SwapIconSvg direction={DirectionLeft} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <OfferItemThumbnailSkeleton size={SizeLG} />
        <OfferItemThumbnailSkeleton size={SizeLG} />
      </div>
    </div>
  </div>
)
