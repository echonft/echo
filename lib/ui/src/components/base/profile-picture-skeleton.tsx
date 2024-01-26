import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size?: ProfilePictureSize
  border?: boolean
}

export const ProfilePictureSkeleton: FunctionComponent<Props> = ({ size = SIZE_LG, border = true }) => {
  return (
    <div
      className={clsx(
        border && ['border-solid', 'border-3', 'border-yellow-500'],
        size === SIZE_LG && ['h-40', 'w-40', 'rounded-2xl'],
        size === SIZE_MD && ['h-28', 'w-28', 'rounded-2xl'],
        size === SIZE_SM && ['h-[6.1875rem]', 'w-[5.875rem]', 'rounded-lg'],
        'bg-white/[0.08]',
        'animate-pulse'
      )}
    />
  )
}
