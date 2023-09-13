import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const NftDetailsAttributeSkeleton: FunctionComponent = () => {
  return <div className={clsx('w-[20rem]', 'h-[4.875rem]', 'bg-white/[0.08]', 'rounded-2xl', 'animate-pulse')} />
}
