import { SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  size?: ProfilePictureSize
}

export const ProfilePictureSkeleton: FunctionComponent<Props> = ({ size = SIZE_MD }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        size === SIZE_MD && ['h-40', 'w-40'],
        size === SIZE_SM && ['h-28', 'w-28'],
        'bg-white/[0.08]',
        'animate-pulse'
      )}
    />
  )
}
