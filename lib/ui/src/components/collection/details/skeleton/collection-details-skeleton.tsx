import { ProfileLayout } from '@echo/ui/components/base/layout/profile-layout'
import { ProfileSkeleton } from '@echo/ui/components/base/profile-skeleton'
import { CollectionDetailsDescription } from '@echo/ui/components/collection/details/collection-details-description'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CollectionDetailsSkeleton: FunctionComponent = () => {
  return (
    <ProfileLayout>
      <ProfileSkeleton />
      <div className={clsx('w-max', 'h-max', 'invisible')}>
        <CollectionDetailsDescription description={'description'} />
      </div>
    </ProfileLayout>
  )
}
