import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { ListingDetailsItemsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-items-container-skeleton'
import { ListingDetailsTargetsContainerSkeleton } from '@echo/ui/components/listing/details/skeleton/listing-details-targets-container-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { ListingOfferUserDetailsRoundedUserWalletSkeleton } from '@echo/ui/components/user/listing-offer/skeleton/listing-offer-user-details-rounded-user-wallet-skeleton'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

// FIXME This needs to be updated to new view
export const ListingDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-20', 'p-4')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'pb-5')}>
      <ListingOfferUserDetailsLayout>
        <ProfilePictureSkeleton />
        <ListingOfferUserDetailsDiscordTagAndWalletLayout>
          <UserDiscordTagSkeleton />
          <ListingOfferUserDetailsRoundedUserWalletSkeleton />
        </ListingOfferUserDetailsDiscordTagAndWalletLayout>
      </ListingOfferUserDetailsLayout>
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
