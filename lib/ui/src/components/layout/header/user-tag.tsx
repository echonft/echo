import { UserTagPicture } from './user-tag-picture'
import { User } from '../../../../../ui-model'
import { clsx } from 'clsx'
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
      <UserTagPicture user={user} />
      <span className={clsx('prose-label-sm-semi', 'text-yellow-400')}>{user.discordUsername}</span>
    </div>
  )
}
