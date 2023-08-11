import { PaddedContainer } from '../../layout/padded-container'
import { UserDetailsSkeleton } from './user-details-skeleton'
import { UserNftsAndFiltersContainerSkeleton } from './user-nfts-and-filters-container-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserSkeleton: FunctionComponent = () => {
  return (
    <PaddedContainer>
      <div className={clsx('h-full', 'w-full', 'flex', 'flex-col', 'gap-14')}>
        <UserDetailsSkeleton />
        <UserNftsAndFiltersContainerSkeleton />
      </div>
    </PaddedContainer>
  )
}
