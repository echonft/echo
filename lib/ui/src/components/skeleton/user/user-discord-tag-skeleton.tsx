import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserDiscordTagSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'h-[2.5rem]',
        'w-[16rem]',
        'py-0.25',
        'px-2.5',
        'rounded-lg',
        'items-center',
        'bg-purple-500',
        'gap-[0.31rem]',
        'animate-pulse'
      )}
    />
  )
}
