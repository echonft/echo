import { DefaultUserProfilePicture } from '../../base/svg/default-user-profile-picture'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserProfilePictureSkeleton: FunctionComponent = () => {
  return (
    <DefaultUserProfilePicture
      className={clsx('rounded-2xl', 'border-solid', 'border-3', 'border-yellow-500', 'w-40', 'h-40', 'blur-sm')}
      width={160}
      height={160}
    />
  )
}
