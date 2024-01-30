import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const NftsFiltersContainerButtonSkeleton: FunctionComponent = () => {
  return <button className={clsx('btn-gradient', 'w-full', 'p-2.5', 'h-[2.875rem]', 'animate-pulse')} disabled />
}
