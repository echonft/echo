import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const NftThumbnailSkeleton: FunctionComponent = () => (
  <div className={clsx('rounded-2xl', 'w-52', 'h-[15rem]', 'bg-white/[0.08]', 'animate-pulse')} />
)
