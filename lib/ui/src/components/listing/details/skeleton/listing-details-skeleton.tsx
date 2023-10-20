import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { ListingDetailsItemsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-items-container-skeleton'
import { ListingDetailsTargetsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-targets-container-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/shared/skeleton/user-discord-tag-skeleton'
import { UserProfilePictureSkeleton } from '@echo/ui/components/shared/skeleton/user-profile-picture-skeleton'
import { UserWalletSkeleton } from '@echo/ui/components/shared/skeleton/user-wallet-skeleton'
import { SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-16', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
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
      <ListingDetailsItemsContainerSkeleton />
      <div className={clsx('pb-4')}>
        <ItemsDetailsSeparator />
      </div>
      <ListingDetailsTargetsContainerSkeleton />
    </div>
  </div>
)
