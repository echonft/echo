import { pathProvider } from '@echo/api/routing/path-provider'
import { type User } from '@echo/model/types/user'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ProfilePicture } from '@echo/ui/components/base/profile-picture'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
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
export const UserDetails: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <UserDetailsLayout>
      <InternalLink path={pathProvider.user.default.get({ username })}>
        <ProfilePicture alt={username} pictureUrl={avatarUrl} size={SIZE_MD} />
      </InternalLink>
      <UserDetailsDiscordTagAndWalletLayout>
        <UserDiscordTag username={username} discordUsername={discord.username} />
        <WalletConnectedButton wallet={wallet} />
      </UserDetailsDiscordTagAndWalletLayout>
    </UserDetailsLayout>
  )
}
