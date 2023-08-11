import { UserNftsContainer } from '../../user/user-nfts-container'
import { UserOfferButton } from '../../user/user-offer-button'
import { CollectionFilterPanelSkeleton } from './filters/collection-filter-panel-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const UserNftsAndFiltersContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'gap-8')}>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'gap-4')}>
        <UserOfferButton count={0} />
        <CollectionFilterPanelSkeleton />
      </div>
      <UserNftsContainer nfts={[]} />
    </div>
  )
}
