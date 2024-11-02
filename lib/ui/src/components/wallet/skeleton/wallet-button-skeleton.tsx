import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const WalletButtonSkeleton: FunctionComponent = () => {
  return <div className={clsx('btn-auth', 'animate-pulse')} />
}
