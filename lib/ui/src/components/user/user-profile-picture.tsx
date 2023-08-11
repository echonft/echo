import { ProfilePicture } from '../base/profile-picture'
import { DefaultUserProfilePicture } from '../base/svg/default-user-profile-picture'
import { getUserAvatarUrl } from '@echo/discord'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordId: string
  discordAvatar: string | undefined
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordId,
  discordAvatar
}) => {
  const pictureUrl = getUserAvatarUrl(discordId, discordAvatar, 256)
  if (isNil(pictureUrl)) {
    return (
      <DefaultUserProfilePicture
        className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40')}
        width={160}
        height={160}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={discordUsername} />
}
