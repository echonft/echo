import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/shared/skeleton/swap-direction-header-skeleton'
import { UserDetailsContainerSkeleton } from '@echo/ui/components/shared/skeleton/user-details-container-skeleton'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ListingRowSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <UserDetailsContainerSkeleton />
      </div>
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <div className={clsx('flex', 'flex-row-reverse', 'grow', 'basis-0')}>
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <SwapDirectionHeaderSkeleton />
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
              'w-[0.125rem]',
              'box-border',
              'border-solid',
              'border-x',
              'border-white/[0.08]'
            )}
          />
        </div>
        <div className={clsx('flex', 'grow', 'basis-0')}>
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <SwapDirectionHeaderSkeleton />
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
