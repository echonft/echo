import { type User } from '@echo/model/types/user'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { UserDiscordTag } from '@echo/ui/components/user/profile/user-discord-tag'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import { SIZE_MD } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

interface Props {
  user: User
}

/**
 * Shared between listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender) and their wallet address
 * @param user
 */
export const ListingOfferUserDetails: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <ListingOfferUserDetailsLayout>
      <ProfilePicture alt={username} pictureUrl={avatarUrl} size={SIZE_MD} />
      <ListingOfferUserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTag discordUsername={username} />
        <WalletConnectedButton wallet={wallet} />
      </ListingOfferUserDetailsDiscordTagAndWalletLayout>
    </ListingOfferUserDetailsLayout>
  )
}
