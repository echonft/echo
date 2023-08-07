import { CollectionProfilePictureSkeleton } from './collection-profile-picture-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionProfileSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8')}>
      <CollectionProfilePictureSkeleton />
      <div className={clsx('flex', 'flex-col', 'grow', 'gap-4')}>
        <div className={clsx('bg-white', 'w-[36rem]', 'h-[4.5rem]', 'animate-pulse', 'rounded-lg')} />
        <div className={clsx('bg-white', 'w-24', 'h-8', 'animate-pulse', 'rounded-lg')} />
      </div>
    </div>
  )
}
