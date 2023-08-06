import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const NftDetailsHeaderSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'h-[8.375rem]', 'justify-between')}>
      <div className={clsx('bg-white', 'w-[10rem]', 'h-[1.25rem]', 'animate-pulse', 'rounded-lg')} />
      <div className={clsx('flex', 'flex-col', 'gap-2')}>
        <div className={clsx('bg-white', 'w-[32rem]', 'h-[3rem]', 'animate-pulse', 'rounded-lg')} />
        <div
          className={clsx('flex', 'flex-row', 'w-[13rem]', 'h-[2rem]', 'rounded-lg', 'bg-purple-500', 'animate-pulse')}
        />
      </div>
    </div>
  )
}
