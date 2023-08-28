import { getUserProfilePictureSize, UserProfilePictureSize } from '../user/nft-profile-picture-size'
import { SizeLG, SizeMD } from '@echo/ui-model'
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
        size === SizeLG && ['h-40', 'w-40'],
        size === SizeMD && ['h-[120px]', 'w-[120px]']
      )}
      src={pictureUrl.href}
      alt={alt}
      width={getUserProfilePictureSize(size)}
      height={getUserProfilePictureSize(size)}
    />
  )
}
