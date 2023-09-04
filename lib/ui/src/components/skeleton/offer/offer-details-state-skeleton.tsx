import clsx from 'clsx'
import { FunctionComponent } from 'react'

export const OfferDetailsStateSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-row', 'items-center', 'gap-16', 'pr-4')}>
    <div className={clsx('bg-white', 'w-28', 'h-9', 'animate-pulse', 'rounded-lg')} />
    <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
    <div className={clsx('bg-white', 'w-28', 'h-9', 'animate-pulse', 'rounded-lg')} />
  </div>
)
