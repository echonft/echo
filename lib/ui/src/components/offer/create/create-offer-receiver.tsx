import { type User } from '@echo/model/types/user'
import { RoundedProfilePicture } from '@echo/ui/components/base/rounded-profile-picture'
import { DiscordUsernameTag } from '@echo/ui/components/user/tag/discord-username-tag'
import { SIZE_MD } from '@echo/ui/constants/size'
import { classes } from '@echo/ui/helpers/classes'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { type FunctionComponent } from 'react'

interface Props {
  user: User
  disabled?: boolean
}

export const CreateOfferReceiver: FunctionComponent<Props> = ({ user, disabled }) => {
  const { discord, wallet } = user
  const { username, avatarUrl } = discord
  return (
    <div
      className={classes(
        'flex',
        'flex-row',
        'gap-3.5',
        'items-center',
        'max-w-fit',
        'p-2',
        'rounded-[2.8125rem]',
        'border',
        'border-white/10',
        disabled && 'opacity-40'
      )}
    >
      <RoundedProfilePicture pictureUrl={avatarUrl} size={SIZE_MD} alt={user.username} />
      <div className={classes('flex', 'flex-col', 'gap-1.5', 'pr-4', 'items-center')}>
        <DiscordUsernameTag username={username} />
        <span className={classes('prose-paragraph-sm', '!text-[0.625rem]', 'text-white/80', 'tracking-[0.00625rem]')}>
          {shortenAddress(wallet)}
        </span>
      </div>
    </div>
  )
}
