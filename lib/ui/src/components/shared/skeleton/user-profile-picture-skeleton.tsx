import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const UserProfilePictureSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        'h-40',
        'w-40',
        'bg-white/[0.08]',
        'animate-pulse'
      )}
    />
  )
}
