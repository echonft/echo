import { SizeLG, SizeMD } from '../../constants/size'
import { getProfilePictureSize } from '../../helpers/get-profile-picture-size'
import { ProfilePictureSize } from '../../types/profile-picture-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  pictureUrl: URL
  alt?: string
  size: ProfilePictureSize
}

export const ProfilePicture: FunctionComponent<Props> = ({ pictureUrl, alt, size = SizeLG }) => {
  return (
    <img
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SizeLG && ['h-40', 'w-40'],
        size === SizeMD && ['h-[7.5rem]', 'w-[7.5rem]']
      )}
      src={pictureUrl.href}
      alt={alt}
      width={getProfilePictureSize(size)}
      height={getProfilePictureSize(size)}
    />
  )
}
