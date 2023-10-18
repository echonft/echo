import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const SwapDirectionHeaderSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'gap-2', 'items-center')}>
      <span className={clsx('w-6', 'h-6', 'bg-yellow-500', 'rounded-lg', 'animate-pulse')}></span>
    </div>
  )
}
