import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { SIZE_SM } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingOfferUserDetailsSkeleton: FunctionComponent = () => {
  return (
    <ListingOfferUserDetailsLayout>
      <ProfilePictureSkeleton size={SIZE_SM} />
      <ListingOfferUserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTagSkeleton />
        <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-[8rem]', 'h-[2.059375rem]', 'animate-pulse')} />
      </ListingOfferUserDetailsDiscordTagAndWalletLayout>
    </ListingOfferUserDetailsLayout>
  )
}
