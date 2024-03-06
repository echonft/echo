import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const NavigationPillSkeleton: FunctionComponent = () => {
  return (
    <button className={clsx('pill', 'animate-pulse')} disabled={true}>
      <span className={clsx('prose-label-md', 'text-white', 'select-none', 'invisible')}>{'Items'}</span>
    </button>
  )
}
