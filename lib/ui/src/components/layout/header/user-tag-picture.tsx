import { DefaultUserProfilePicture } from '../../base/svg/default-user-profile-picture'
import { getUserAvatarUrl } from '@echo/discord'
import { User } from '../../../../../ui-model'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface UserTagPictureProps {
  user: User
}

export const UserTagPicture: FunctionComponent<UserTagPictureProps> = ({ user }) => {
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
