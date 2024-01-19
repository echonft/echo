import { type User } from '@echo/model/types/user'
import { UserDiscordTag } from '@echo/ui/components/user/base/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/user/base/user-profile-picture'
import { ListingOfferUserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-discord-tag-and-wallet-layout'
import { ListingOfferUserDetailsLayout } from '@echo/ui/components/user/listing-offer/layout/listing-offer-user-details-layout'
import { WalletConnectedButton } from '@echo/ui/components/wallet/wallet-connected-button'
import { SIZE_SM } from '@echo/ui/constants/size'
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
      <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} size={SIZE_SM} />
      <ListingOfferUserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTag discordUsername={username} />
        <WalletConnectedButton wallet={wallet} />
      </ListingOfferUserDetailsDiscordTagAndWalletLayout>
    </ListingOfferUserDetailsLayout>
  )
}
