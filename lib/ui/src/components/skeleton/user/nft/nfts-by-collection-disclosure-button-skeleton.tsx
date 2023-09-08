import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const NftsByCollectionDisclosureButtonSkeleton: FunctionComponent = () => {
  return (
    <div
      className={clsx('rounded-lg', 'bg-white/[0.08]', 'h-[1.0625rem]', 'w-[9.5rem]', 'mt-2.5', 'ml-2.5', 'mb-2.5')}
    />
  )
}
