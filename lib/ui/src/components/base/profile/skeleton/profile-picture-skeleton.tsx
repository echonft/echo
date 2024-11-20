import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ProfilePictureSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'flex-none',
        'select-none',
        'h-28',
        'w-28',
        'rounded-2xl',
        'border-solid',
        'border-3',
        'border-yellow-500',
        'bg-dark-500',
        'animate-pulse'
      )}
    />
  )
}
