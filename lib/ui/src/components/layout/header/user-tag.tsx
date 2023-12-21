import { type AuthUser } from '@echo/model/types/auth-user'
import { UserTagPicture } from '@echo/ui/components/layout/header/user-tag-picture'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import type { UserTagSize } from '@echo/ui/types/user-tag-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
  size?: UserTagSize
}

export const UserTag: FunctionComponent<Props> = ({ user, size = SIZE_MD }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-2.5',
        'rounded-lg',
        'items-center',
        size === SIZE_MD && ['px-2.5', 'py-1.5'],
        size === SIZE_LG && ['py-3', 'px-4'],
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
