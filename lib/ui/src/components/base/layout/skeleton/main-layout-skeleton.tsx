import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const MainLayoutSkeleton: FunctionComponent = () => {
  return <div className={clsx('h-full', 'w-full', 'bg-dark-500', 'animate-pulse')} />
}
