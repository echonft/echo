import { CollectionDetailsSkeleton } from './collection-details-skeleton'
import { CollectionNftsSkeleton } from './collection-nfts-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const CollectionSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('w-full', 'flex', 'flex-col', 'gap-14')}>
      <CollectionDetailsSkeleton />
      <CollectionNftsSkeleton />
    </div>
  )
}
