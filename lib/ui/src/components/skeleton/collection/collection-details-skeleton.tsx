import { BannerSkeleton } from '../base/banner-skeleton'
import { CollectionProfileSkeleton } from './collection-profile-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionDetailsSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>
      <BannerSkeleton />
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-40', 'pb-8')}>
        <CollectionProfileSkeleton />
      </div>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pb-14')}>
        <div className={clsx('bg-white/60', 'w-[37rem]', 'h-16', 'animate-pulse', 'rounded-lg')} />
      </div>
    </div>
  )
}
