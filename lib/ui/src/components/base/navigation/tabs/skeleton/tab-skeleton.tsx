import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const TabSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('tab', 'animate-pulse')}>
      <span className={clsx('prose-label-md', 'text-white', 'select-none', 'invisible')}>{'Items'}</span>
    </div>
  )
}
