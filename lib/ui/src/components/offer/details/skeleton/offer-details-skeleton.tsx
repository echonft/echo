import { OfferDetailsAssetsSeparator } from '@echo/ui/components/offer/details/offer-details-assets-separator'
import { OfferDetailsItemsContainerSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-items-container-skeleton'
import { OfferDetailsStateSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-state-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-16', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
      <div className={clsx('flex', 'flex-row', 'gap-5')}>
        <UserProfilePictureSkeleton size={SizeMD} />
        <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
          <UserDiscordTagSkeleton />
          <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-32', 'h-6', 'animate-pulse')} />
        </div>
      </div>
      <OfferDetailsStateSkeleton />
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <OfferDetailsItemsContainerSkeleton isReceiver />
      <div className={clsx('pb-4')}>
        <OfferDetailsAssetsSeparator />
      </div>
      <OfferDetailsItemsContainerSkeleton isReceiver={false} />
      <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
        <div className={clsx('flex', 'flex-row', 'gap-8')}>
          <div className={clsx('btn-gradient', 'btn-size-alt', 'animate-pulse')} />
          <div className={clsx('btn-cancel', 'btn-size-alt', 'animate-pulse')} />
        </div>
      </div>
    </div>
  </div>
)
