import { ProfilePicture } from '../base/profile-picture'
import { DefaultUserProfilePicture } from '../base/svg/default-user-profile-picture'
import {
  userProfilePictureHeight,
  UserProfilePictureSize,
  userProfilePictureSize,
  userProfilePictureWidth
} from './nft-profile-picture-size'
import { getUserAvatarUrl } from '@echo/discord'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface UserProfilePictureProps {
  discordUsername: string
  discordId: string
  discordAvatar: string | undefined
  size?: UserProfilePictureSize
}

export const UserProfilePicture: FunctionComponent<UserProfilePictureProps> = ({
  discordUsername,
  discordId,
  discordAvatar,
  size = UserProfilePictureSize.LARGE
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
          userProfilePictureWidth(size),
          userProfilePictureHeight(size)
        )}
        width={userProfilePictureSize(size)}
        height={userProfilePictureSize(size)}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={discordUsername} size={size} />
}
