import { DirectionLeft } from '../../../../constants/direction'
import { SizeLG } from '../../../../constants/size'
import { SwapIconSvg } from '../../../base/svg/swap-icon-svg'
import { ItemThumbnailSkeleton } from '../../../item/thumbnail/skeleton/item-thumbnail-skeleton'
import { OfferStatePillSkeleton } from './offer-state-pill-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferCollectionRowSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
    <OfferStatePillSkeleton />
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-2')}>
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </div>
      <SwapIconSvg direction={DirectionLeft} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <ItemThumbnailSkeleton size={SizeLG} />
        <ItemThumbnailSkeleton size={SizeLG} />
      </div>
    </div>
  </div>
)
