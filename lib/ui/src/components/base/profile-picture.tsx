import {
  getUserProfilePictureHeight,
  getUserProfilePictureSize,
  getUserProfilePictureWidth,
  UserProfilePictureSize
} from '../user/nft-profile-picture-size'
import { SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface ProfilePictureProps {
  pictureUrl: URL
  alt?: string
  size?: UserProfilePictureSize
}

export const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ pictureUrl, alt, size = SizeLG }) => {
  return (
    <img
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        getUserProfilePictureWidth(size),
        getUserProfilePictureHeight(size)
      )}
      src={pictureUrl.href}
      alt={alt}
      width={getUserProfilePictureSize(size)}
      height={getUserProfilePictureSize(size)}
    />
  )
}
