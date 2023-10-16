import { OfferDetailsAssetsSeparator } from '@echo/ui/components/offer/details/offer-details-assets-separator'
import { OfferDetailsItemsContainerSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-items-container-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { UserWalletSkeleton } from '@echo/ui/components/shared/skeleton/user-wallet-skeleton'
import { SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-16', 'p-4', 'rounded-lg', 'bg-white/[0.05]', 'pb-24')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
      <div className={clsx('flex', 'flex-row', 'gap-5')}>
        <UserProfilePictureSkeleton size={SizeMD} />
        <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
          <UserDiscordTagSkeleton />
          <UserWalletSkeleton />
        </div>
      </div>
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <OfferDetailsItemsContainerSkeleton />
      <div className={clsx('pb-4')}>
        <OfferDetailsAssetsSeparator />
      </div>
      <OfferDetailsItemsContainerSkeleton />
    </div>
  </div>
)
