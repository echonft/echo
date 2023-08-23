import { getUserAvatarUrl } from '../../helpers/get-user-avatar-url'
import { ProfilePicture } from '../base/profile-picture'
import { DefaultUserProfilePicture } from '../base/svg/default-user-profile-picture'
import {
  getUserProfilePictureHeight,
  getUserProfilePictureSize,
  getUserProfilePictureWidth,
  UserProfilePictureSize
} from './nft-profile-picture-size'
import { SizeLG } from '@echo/ui-model'
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
  size = SizeLG
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
          getUserProfilePictureWidth(size),
          getUserProfilePictureHeight(size)
        )}
        width={getUserProfilePictureSize(size)}
        height={getUserProfilePictureSize(size)}
      />
    )
  }
  return <ProfilePicture pictureUrl={pictureUrl} alt={discordUsername} size={size} />
}
