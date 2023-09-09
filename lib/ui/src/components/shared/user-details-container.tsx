import { SizeMD } from '../../constants/size'
import { UserDiscordTag } from './user-discord-tag'
import { UserProfilePicture } from './user-profile-picture'
import { UserWallet } from './user-wallet'
import { User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
