import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const NftDetailsHeaderSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col')}>
      <h2 className={clsx('prose-label-lg', 'text-white', 'mb-4.5', 'w-max', 'blur-md')}>{'Sun Flyers'}</h2>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'items-center', 'mb-2.5')}>
        <span className={clsx('prose-display-md-bold', 'text-white', 'blur-md')}>{'Sun Flyers #999'}</span>
      </div>
      <div className={clsx('w-[13.25rem]', 'h-[1.9375rem]', 'rounded-lg', 'bg-purple-500', 'animate-pulse')} />
    </div>
  )
}
