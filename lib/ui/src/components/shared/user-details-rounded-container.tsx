import { type User } from '@echo/model/types/user'
import { RoundedProfilePicture } from '@echo/ui/components/shared/rounded-profile-picture'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { DiscordUsernameTag } from '@echo/ui/components/user/tag/discord-username-tag'
import { SIZE_LG } from '@echo/ui/constants/size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  user: User
}

/**
 * Shared between new listings and offers
 * Shows the picture of the user (if listing = creator, if offer = sender), their discord tag and their wallet address
 * @param user
 */
export const UserDetailsRoundedContainer: FunctionComponent<Props> = ({ user }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-3.5',
        'items-center',
        'max-w-fit',
        'p-2',
        'rounded-[2.8125rem]',
        'border',
        'border-white/10'
      )}
    >
      <RoundedProfilePicture pictureUrl={avatarUrl} size={SIZE_LG} alt={user.username} />
      <div className={clsx('flex', 'flex-col', 'gap-1.5', 'pr-4', 'items-center')}>
        <DiscordUsernameTag username={username} />
        <UserWallet wallet={wallet} />
      </div>
    </div>
  )
}
