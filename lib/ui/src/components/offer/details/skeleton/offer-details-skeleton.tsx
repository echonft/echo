import { OfferDetailsItemsContainerSkeleton } from '@echo/ui/components/offer/details/skeleton/offer-details-items-container-skeleton'
import { ItemsSeparator } from '@echo/ui/components/shared/items-separator'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { UserWalletSkeleton } from '@echo/ui/components/shared/skeleton/user-wallet-skeleton'
import { SIZE_SM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-24')}>
    <div className={clsx('flex', 'flex-row', 'gap-5')}>
      <UserProfilePictureSkeleton size={SIZE_SM} />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTagSkeleton />
        <UserWalletSkeleton />
      </div>
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-20')}>
      <OfferDetailsItemsContainerSkeleton />
      <div className={clsx('pb-4')}>
        <ItemsSeparator />
      </div>
      <OfferDetailsItemsContainerSkeleton />
    </div>
  </div>
)
