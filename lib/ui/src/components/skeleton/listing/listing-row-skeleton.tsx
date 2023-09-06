import { NftThumbnailSkeleton } from '../nft/nft-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '../shared/swap-direction-header-skeleton'
import { UserDetailsContainerSkeleton } from '../shared/user-details-container-skeleton'
import { DirectionIn, DirectionOut } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const ListingRowSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <UserDetailsContainerSkeleton />
      </div>
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <div className={clsx('flex', 'flex-row-reverse', 'grow', 'basis-0')}>
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <SwapDirectionHeaderSkeleton direction={DirectionOut} title={'Offering'} />
            <div className={clsx('flex', 'flex-row', 'grow', 'gap-5', 'flex-wrap')}>
              <NftThumbnailSkeleton />
              <NftThumbnailSkeleton />
            </div>
          </div>
        </div>
        <div className={clsx('flex', 'self-stretch', 'flex-none', 'py-6')}>
          <span
            className={clsx(
              'mx-10',
              'h-full',
              'w-[2px]',
              'box-border',
              'border-solid',
              'border-x',
              'border-white/[0.08]'
            )}
          />
        </div>
        <div className={clsx('flex', 'grow', 'basis-0')}>
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <SwapDirectionHeaderSkeleton direction={DirectionIn} title={'Interested in'} />
            <div className={clsx('flex', 'grow', 'gap-5', 'flex-wrap')}>
              <NftThumbnailSkeleton />
              <NftThumbnailSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
