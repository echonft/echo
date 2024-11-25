import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const CardSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'w-[12.625rem]',
        'card-height',
        'border',
        'border-solid',
        'border-white/10',
        'bg-dark-500',
        'animate-pulse'
      )}
    />
  )
}
