import { UserProfilePictureSize } from '../../constants/user-profile-picture-size'
import { getUserAvatarUrl } from '../../helpers/get-user-avatar-url'
import { getUserProfilePictureSize } from '../../helpers/get-user-profile-picture-size'
import { ProfilePicture } from '../base/profile-picture'
import { DefaultUserProfilePicture } from '../base/svg/default-user-profile-picture'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordId: string
  discordAvatar: string | undefined
  size: UserProfilePictureSize
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordId,
  discordAvatar,
  size
}) => {
  const pictureUrl = getUserAvatarUrl(discordId, discordAvatar, 256)
  if (isNil(pictureUrl)) {
    return (
      <DefaultUserProfilePicture
        className={clsx(
          'rounded-2xl',
          'border-solid',
          'border-3',
          'border-yellow-500',
          size === SizeLG && ['h-40', 'w-40'],
          size === SizeMD && ['h-[7.5rem]', 'w-[7.5rem]']
        )}
        width={getUserProfilePictureSize(size)}
        height={getUserProfilePictureSize(size)}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={discordUsername} size={size} />
}
