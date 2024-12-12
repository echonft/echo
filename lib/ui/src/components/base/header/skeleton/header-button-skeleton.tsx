import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const HeaderButtonSkeleton: FunctionComponent = () => {
  return <div className={clsx('bg-white/[0.08]', 'w-48', 'h-12', 'animate-pulse')} />
}
