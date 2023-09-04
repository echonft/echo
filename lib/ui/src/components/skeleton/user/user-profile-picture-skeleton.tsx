import { UserProfilePictureSize } from '../../../constants/user-profile-picture-size'
import { getUserProfilePictureSize } from '../../../helpers/get-user-profile-picture-size'
import { DefaultUserProfilePicture } from '../../base/svg/default-user-profile-picture'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface UserProfilePictureSkeletonProps {
  size: UserProfilePictureSize
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
        size === SizeMD && ['h-[120px]', 'w-[120px]'],
        'blur-sm'
      )}
      width={getUserProfilePictureSize(size)}
      height={getUserProfilePictureSize(size)}
    />
  )
}
