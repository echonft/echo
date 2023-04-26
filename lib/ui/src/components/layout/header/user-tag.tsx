import { getUserAvatarUrl } from '@echo/discord'
import { User } from '@echo/model'
import { clsx } from 'clsx'
import Image from 'next/image'
import { FunctionComponent } from 'react'

export interface UserTagProps {
  user: User
}

export const UserTag: FunctionComponent<UserTagProps> = ({ user }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-2.5',
        'rounded-lg',
        'items-center',
        'px-2.5',
        'py-1.5',
        'bg-white/[0.08]',
        'w-max'
      )}
    >
      <Image
        className={clsx('w-4.5', 'h-4.5', 'rounded')}
        src={getUserAvatarUrl(user, 32, 'png')}
        alt={''}
        width={18}
        height={18}
      />
      <span className={clsx('prose-label-sm-bold', 'text-yellow-400')}>{user.discordUsername}</span>
    </div>
  )
}
