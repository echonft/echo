import { ProfileSkeleton } from '@echo/ui/components/base/profile-skeleton'
import { CollectionProfileDetailsLayout } from '@echo/ui/components/collection/profile/layout/collection-profile-details-layout'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CollectionDetailsSkeleton: FunctionComponent = () => {
  return (
    <ProfileSkeleton>
      <CollectionProfileDetailsLayout>
        <div className={clsx('loading-div')}>
          <h1 className={clsx('text-white', 'prose-display-lg-bold', 'uppercase', 'truncate', 'invisible')}>
            {'TEST COLLECTION'}
          </h1>
        </div>
        <div className={clsx('loading-div')}>
          <h2 className={clsx('text-white', 'prose-header-md', 'invisible')}>{'10k NFTs'}</h2>
        </div>
      </CollectionProfileDetailsLayout>
    </ProfileSkeleton>
  )
}
