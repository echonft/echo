import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size: ProfilePictureSize
}

export const UserProfilePictureSkeleton: FunctionComponent<Props> = ({ size }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SIZE_LG && ['h-40', 'w-40'],
        size === SIZE_MD && ['h-[7.5rem]', 'w-[7.5rem]'],
        'bg-white/[0.08]',
        'animate-pulse'
      )}
    />
  )
}
