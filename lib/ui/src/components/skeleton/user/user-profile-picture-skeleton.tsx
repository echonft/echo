import { ProfilePictureSize } from '../../../constants/profile-picture-size'
import { getProfilePictureSize } from '../../../helpers/get-profile-picture-size'
import { DefaultUserProfilePicture } from '../../base/svg/default-user-profile-picture'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface UserProfilePictureSkeletonProps {
  size: ProfilePictureSize
}

export const UserProfilePictureSkeleton: FunctionComponent<UserProfilePictureSkeletonProps> = ({ size }) => {
  return (
    <DefaultUserProfilePicture
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SizeLG && ['h-40', 'w-40'],
        size === SizeMD && ['h-[7.5rem]', 'w-[7.5rem]'],
        'blur-sm'
      )}
      width={getProfilePictureSize(size)}
      height={getProfilePictureSize(size)}
    />
  )
}
