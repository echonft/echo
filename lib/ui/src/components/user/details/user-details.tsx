import type { User } from '@echo/model/types/user'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ProfilePicture } from '@echo/ui/components/base/profile/profile-picture'
import { WalletCopyToClipboardButton } from '@echo/ui/components/base/wallet/wallet-copy-to-clipboard-button'
import { UserDetailsDiscordTagAndWalletLayout } from '@echo/ui/components/user/details/layout/user-details-discord-tag-and-wallet-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { UserTag } from '@echo/ui/components/user/profile/user-tag'
import { Size } from '@echo/ui/constants/size'
import { type FunctionComponent } from 'react'

interface Props {
  user: User
  isAuthUser?: boolean
}

/**
 * Shared between listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender) and their wallet address
 * @param user
 * @param isAuthUser
 */
export const UserDetails: FunctionComponent<Props> = ({ user, isAuthUser = false }) => {
  const { discord } = user
  const { username, avatarUrl } = discord
  return (
    <UserDetailsLayout>
      <InternalLink path={frontendRoutes.user.details.get({ username }).toString()}>
        <ProfilePicture alt={username} pictureUrl={avatarUrl} size={Size.MD} />
      </InternalLink>
      <UserDetailsDiscordTagAndWalletLayout>
        <UserTag user={user} isAuthUser={isAuthUser} />
        <WalletCopyToClipboardButton wallet={user.wallet} />
      </UserDetailsDiscordTagAndWalletLayout>
    </UserDetailsLayout>
  )
}
