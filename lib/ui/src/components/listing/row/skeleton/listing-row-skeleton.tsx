import { DirectionIn, DirectionOut } from '../../../../constants/swap-direction'
import { NftThumbnailSkeleton } from '../../../nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '../../../shared/skeleton/swap-direction-header-skeleton'
import { UserDetailsContainerSkeleton } from '../../../shared/skeleton/user-details-container-skeleton'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const ListingRowSkeleton: FunctionComponent = () => {
  const t = useTranslations('shared.assets')

  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'p-4', 'rounded-2xl', 'bg-white/[0.05]', 'gap-12')}>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'gap-12')}>
        <UserDetailsContainerSkeleton />
      </div>
      <div className={clsx('flex', 'flex-row', 'grow')}>
        <div className={clsx('flex', 'flex-row-reverse', 'grow', 'basis-0')}>
          <div className={clsx('flex', 'flex-col', 'gap-5')}>
            <SwapDirectionHeaderSkeleton direction={DirectionOut} title={t('out')} />
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
            <SwapDirectionHeaderSkeleton direction={DirectionIn} title={t('in')} />
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
