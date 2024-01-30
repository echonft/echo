import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { WalletConnectedButtonSkeleton } from '@echo/ui/components/wallet/skeleton/wallet-connected-button-skeleton'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

export const ListingOfferUserDetailsSkeleton: FunctionComponent = () => {
  return (
    <ListingOfferUserDetailsLayout>
      <ProfilePictureSkeleton size={SIZE_MD} />
      <ListingOfferUserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTagSkeleton />
        <WalletConnectedButtonSkeleton />
      </ListingOfferUserDetailsDiscordTagAndWalletLayout>
    </ListingOfferUserDetailsLayout>
  )
}
