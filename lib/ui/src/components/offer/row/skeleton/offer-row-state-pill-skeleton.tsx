import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferRowStatePillSkeleton: FunctionComponent = () => (
  <div
    className={clsx(
      'flex',
      'px-4',
      'py-1.5',
      'h-[2.625rem]',
      'w-[6.25rem]',
      'rounded-lg',
      'bg-white/[0.09]',
      'animate-pulse'
    )}
  />
)
