import { type User } from '@echo/model/types/user'
import { DiscordUsernameTag } from '@echo/ui/components/user/tag/discord-username-tag'
import { PICTURE_SIZE_PROFILE_ROUNDED } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { clsx } from 'clsx'
import Image from 'next/image'
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
      className={clsx(
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
      <Image
        className={clsx('rounded-full')}
        src={addPictureSizeToUrl(avatarUrl, PICTURE_SIZE_PROFILE_ROUNDED)}
        alt={user.username}
        width={73}
        height={73}
      />
      <div className={clsx('flex', 'flex-col', 'gap-1.5', 'pr-4', 'items-center')}>
        <DiscordUsernameTag username={username} />
        <span className={clsx('prose-paragraph-sm', '!text-[0.625rem]', 'text-white/80', 'tracking-[0.00625rem]')}>
          {shortenAddress(wallet)}
        </span>
      </div>
    </div>
  )
}
