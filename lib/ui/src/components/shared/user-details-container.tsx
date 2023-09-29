import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import { UserProfilePicture } from '@echo/ui/components/shared/user-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { SizeMD } from '@echo/ui/constants/size'
import { UserDetails } from '@echo/ui/types/model/user-details'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: UserDetails
}

/**
 * Shared between listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender) and their wallet address
 * @param user
 */
export const UserDetailsContainer: FunctionComponent<Props> = ({ user }) => {
  const { discordUsername, discordId, discordAvatar, wallet } = user
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center')}>
      <UserProfilePicture
        discordUsername={discordUsername}
        discordId={discordId}
        discordAvatar={discordAvatar}
        size={SizeMD}
      />
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'py-3')}>
        <UserDiscordTag discordUsername={discordUsername} />
        <UserWallet address={wallet.address} />
      </div>
    </div>
  )
}
