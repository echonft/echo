import { type AuthUser } from '@echo/model/types/auth-user'
import { UserTagPicture } from '@echo/ui/components/user/tag/user-tag-picture'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { classes } from '@echo/ui/helpers/classes'
import type { UserTagSize } from '@echo/ui/types/user-tag-size'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
  size?: UserTagSize
}

export const UserTag: FunctionComponent<Props> = ({ user, size = SIZE_MD }) => {
  return (
    <div
      className={classes(
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
      <span className={classes('prose-label-sm-semi', 'text-yellow-400')}>{user.username}</span>
    </div>
  )
}
