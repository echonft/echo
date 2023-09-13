import { SwapIconSvg } from '@echo/ui/components/base/svg/swap-icon-svg'
import { ItemThumbnailSkeleton } from '@echo/ui/components/item/thumbnail/skeleton/item-thumbnail-skeleton'
import { OfferStatePillSkeleton } from '@echo/ui/components/offer/row/skeleton/offer-state-pill-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { DirectionLeft } from '@echo/ui/constants/direction'
import { SizeLG } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CurrentUserOfferRowSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      <OfferStatePillSkeleton />
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
