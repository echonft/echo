import { DirectionLeft } from '../../../types/direction'
import { SizeLG } from '../../../types/size'
import { SwapIconSvg } from '../../base/svg/swap-icon-svg'
import { NftThumbnailOfferSkeleton } from '../nft/thumbnail/nft-thumbnail-offer-skeleton'
import { UserDiscordTagSkeleton } from '../user/user-discord-tag-skeleton'
import { OfferStateSkeleton } from './offer-state-skeleton'
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
        <NftThumbnailOfferSkeleton size={SizeLG} />
        <NftThumbnailOfferSkeleton size={SizeLG} />
      </div>
      <SwapIconSvg direction={DirectionLeft} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <NftThumbnailOfferSkeleton size={SizeLG} />
        <NftThumbnailOfferSkeleton size={SizeLG} />
      </div>
    </div>
  </div>
)
