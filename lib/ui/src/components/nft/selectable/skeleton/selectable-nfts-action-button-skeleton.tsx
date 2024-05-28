import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const SelectableNftsActionButtonSkeleton: FunctionComponent = () => {
  return <button disabled={true} className={clsx('btn-gradient', 'w-full', 'h-[2.875rem]', 'animate-pulse')} />
}
