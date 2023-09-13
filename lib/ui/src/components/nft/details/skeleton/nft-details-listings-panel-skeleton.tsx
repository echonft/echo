import { HandIconSvg } from '@echo/ui/components/base/svg/hand-icon-svg'
import { NftDetailsListingRowSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-listing-row-skeleton'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NftDetailsListingsPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('nft.details.listings')
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'self-stretch',
        'flex-grow',
        'h-max',
        'bg-white/[0.09]',
        'rounded-2xl',
        'py-3',
        'px-7',
        'gap-2',
        'min-h-[10.375rem]'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'gap-1.5', 'items-center', 'text-white')}>
        <HandIconSvg width={17} />
        <span className={clsx('prose-label-md-semi')}>{t('title')}</span>
      </div>
      <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-2.5', 'self-stretch', 'w-full')}>
        <NftDetailsListingRowSkeleton />
        <NftDetailsListingRowSkeleton />
      </div>
    </div>
  )
}
