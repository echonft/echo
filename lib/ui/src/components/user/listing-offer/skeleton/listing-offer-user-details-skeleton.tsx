import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ListingOfferUserDetailsRoundedUserWalletSkeleton } from '@echo/ui/components/user/listing-offer/skeleton/listing-offer-user-details-rounded-user-wallet-skeleton'
import { SIZE_SM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingOfferUserDetailsSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <ProfilePictureSkeleton size={SIZE_SM} />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTagSkeleton />
        <ListingOfferUserDetailsRoundedUserWalletSkeleton />
      </div>
    </div>
  )
}
