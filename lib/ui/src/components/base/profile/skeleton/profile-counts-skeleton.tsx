import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const ProfileCountsSkeleton: FunctionComponent = () => {
  return <div className={clsx('h-6', 'w-full')} />
}
