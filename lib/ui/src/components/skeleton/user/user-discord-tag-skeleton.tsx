import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserDiscordTagSkeleton: FunctionComponent = () => {
  return <div className={clsx('h-[2.625rem]', 'w-[12rem]', 'rounded-lg', 'bg-purple-500', 'animate-pulse')} />
}
