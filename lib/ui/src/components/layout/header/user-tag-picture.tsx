import { getUserAvatarUrl } from '../../../helpers/get-user-avatar-url'
import { DefaultUserProfilePicture } from '../../base/svg/default-user-profile-picture'
import type { AuthUser } from '@echo/ui-model'
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
