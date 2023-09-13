import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { SizeMD } from '@echo/ui/constants/size'
import type { User } from '@echo/ui/types/model/user'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: User
  userWalletAddress: string
}

/**
 * Shared between listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender) and their wallet address
 * @param user
 * @param userWalletAddress
 * @constructor
 */
export const UserDetailsContainer: FunctionComponent<Props> = ({ user, userWalletAddress }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <UserProfilePicture
        discordUsername={user.discordUsername}
        discordId={user.discordId}
        discordAvatar={user.discordAvatar}
        size={SizeMD}
      />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTag discordUsername={user.discordUsername} />
        <UserWallet address={userWalletAddress} />
      </div>
    </div>
  )
}
