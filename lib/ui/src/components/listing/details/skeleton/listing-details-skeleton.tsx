import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { ListingDetailsItemsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-items-container-skeleton'
import { ListingDetailsTargetsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-targets-container-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { ListingOfferUserDetailsRoundedUserWalletSkeleton } from '@echo/ui/components/user/listing-offer/skeleton/listing-offer-user-details-rounded-user-wallet-skeleton'
import { SIZE_MD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-20', 'p-4')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'pb-5')}>
      <ListingOfferUserDetailsLayout>
        <ProfilePictureSkeleton size={SIZE_MD} />
        <ListingOfferUserDetailsDiscordTagAndWalletLayout>
          <UserDiscordTagSkeleton />
          <ListingOfferUserDetailsRoundedUserWalletSkeleton />
        </ListingOfferUserDetailsDiscordTagAndWalletLayout>
      </ListingOfferUserDetailsLayout>
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pb-16')}>
        <ListingDetailsItemsContainerSkeleton />
      </div>
      <ItemsSeparator />
      <div className={clsx('flex', 'justify-end')}>
        <ListingDetailsTargetsContainerSkeleton />
      </div>
    </div>
  </div>
)
