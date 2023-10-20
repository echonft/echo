import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const UserWalletSkeleton: FunctionComponent = () => {
  return <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-[8rem]', 'h-[2.059375rem]')} />
}
