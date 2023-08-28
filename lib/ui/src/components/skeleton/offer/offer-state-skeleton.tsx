import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferStateSkeleton: FunctionComponent = () => (
  <div
    className={clsx(
      'flex',
      'px-4',
      'py-1.5',
      'h-[2.5rem]',
      'w-[6.25rem]',
      'rounded-lg',
      'bg-white/[0.09]',
      'animate-pulse'
    )}
  />
)
