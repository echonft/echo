import { DefaultUserProfilePicture } from '@echo/ui/components/base/svg/default-user-profile-picture'
import { getUserAvatarUrl } from '@echo/ui/helpers/get-user-avatar-url'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserTagPicture: FunctionComponent<Props> = ({ user }) => {
  const userAvatarUrl = getUserAvatarUrl(user.discordId, user.discordAvatar, 32, 'png')
  if (isNil(userAvatarUrl)) {
    return <DefaultUserProfilePicture className={clsx('w-4.5', 'h-4.5', 'rounded')} width={18} height={18} />
  }
  return (
    <img
      className={clsx('w-4.5', 'h-4.5', 'rounded')}
      src={userAvatarUrl.href}
      alt={user.discordUsername}
      width={18}
      height={18}
    />
  )
}
