import type { User } from '@echo/model/types/user'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { SizeMD } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: User
}

/**
 * Shared between listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender) and their wallet address
 * @param user
 */
export const UserDetailsContainer: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <UserProfilePicture discordUsername={username} discordAvatarUrl={avatarUrl} size={SizeMD} />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTag discordUsername={username} />
        <UserWallet address={wallet.address} />
      </div>
    </div>
  )
}
