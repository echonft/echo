'use client'
import { HandIconSvg } from '@echo/ui/components/base/svg/hand-icon-svg'
import { NftDetailsListingsPanelList } from '@echo/ui/components/nft/details/nft-details-listings-panel-list'
import type { Listing } from '@echo/ui/types/model/listing'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  listings: Listing[]
}

export const NftDetailsListingsPanel: FunctionComponent<Props> = ({ listings }) => {
  const t = useTranslations('nft.details.listings')
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
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
      <NftDetailsListingsPanelList listings={listings} />
    </div>
  )
}
