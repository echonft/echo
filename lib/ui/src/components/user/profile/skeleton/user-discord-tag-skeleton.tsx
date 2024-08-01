import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const UserDiscordTagSkeleton: FunctionComponent = () => {
  return <div className={clsx('h-10', 'w-48', 'rounded-lg', 'bg-white/[0.08]', 'animate-pulse')} />
}
