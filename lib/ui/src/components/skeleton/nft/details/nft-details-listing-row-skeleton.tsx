import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const NftDetailsListingRowSkeleton: FunctionComponent = () => {
  return <div className={clsx('bg-white/[0.09]', 'rounded-lg', 'w-[20rem]', 'h-[1.3125rem]', 'animate-pulse')} />
}
