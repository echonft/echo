import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { ItemThumbnailSkeleton } from '../item/item-thumbnail-skeleton'
import { UserDiscordTagSkeleton } from '../user/user-discord-tag-skeleton'
import { OfferStateSkeleton } from './offer-state-skeleton'
import { DirectionLeft, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferSkeleton: FunctionComponent = () => (
  <div
    className={clsx('flex', 'flex-col', 'min-w-max', 'gap-2', 'px-4', 'pb-4', 'pt-3', 'rounded-lg', 'bg-white/[0.05]')}
  >
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      <OfferStateSkeleton />
      <UserDiscordTagSkeleton />
    </div>
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
