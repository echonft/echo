import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferDetailsButtonsContainerSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-row', 'gap-8')}>
    <div className={clsx('btn-gradient', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'animate-pulse')} />
    <div className={clsx('bg-red-400', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'animate-pulse')} />
  </div>
)
