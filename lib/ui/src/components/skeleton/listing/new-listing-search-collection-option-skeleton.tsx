import { DefaultCollectionProfilePicture } from '../../base/svg/default-collection-profile-picture'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const NewListingSearchCollectionOptionSkeleton: FunctionComponent = () => (
  <div className={clsx('rounded-lg', 'p-2', 'flex', 'flex-row', 'gap-3')}>
    <DefaultCollectionProfilePicture
      className={clsx('rounded-full', 'h-[3.75rem]', 'w-[3.75rem]', 'blur-sm')}
      width={60}
      height={60}
    />
    <div className={clsx('flex', 'flex-col', 'gap-1', 'justify-center')}>
      <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-52', 'h-6', 'animate-pulse')} />
      <div className={clsx('bg-white/[0.08]', 'rounded-lg', 'w-32', 'h-6', 'animate-pulse')} />
    </div>
  </div>
)
