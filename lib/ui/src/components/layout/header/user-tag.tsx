import { UserTagPicture } from '@echo/ui/components/layout/header/user-tag-picture'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTag: FunctionComponent<Props> = ({ user }) => {
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
        'w-max',
        'outline-none'
      )}
    >
      <UserTagPicture user={user} />
      <span className={clsx('prose-label-sm-semi', 'text-yellow-400')}>{user.username}</span>
    </div>
  )
}
