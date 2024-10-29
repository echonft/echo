import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ConnectWalletButtonSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        'bg-dark-500',
        'border',
        'border-solid',
        'border-white/[0.08]',
        'w-36',
        'h-12',
        'animate-pulse'
      )}
    />
  )
}
