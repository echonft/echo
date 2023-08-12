import {
  userProfilePictureHeight,
  UserProfilePictureSize,
  userProfilePictureSize,
  userProfilePictureWidth
} from '../user/nft-profile-picture-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: URL
  alt?: string
  size?: UserProfilePictureSize
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({
  pictureUrl,
  alt,
  size = UserProfilePictureSize.LARGE
}) => {
  return (
    <img
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        userProfilePictureWidth(size),
        userProfilePictureHeight(size)
      )}
      src={pictureUrl.href}
      alt={alt}
      width={userProfilePictureSize(size)}
      height={userProfilePictureSize(size)}
    />
  )
}
