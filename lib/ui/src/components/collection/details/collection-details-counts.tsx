'use client'
import type { CollectionWithCounts } from '@echo/model/types/collection-with-counts'
import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CollectionDetailsCounts: FunctionComponent<
  Pick<CollectionWithCounts, 'listingsCount' | 'nftsCount' | 'offersCount' | 'swapsCount'>
> = ({ listingsCount, nftsCount, offersCount, swapsCount }) => {
  const t = useTranslations('collection.details')
  return (
    <PaddedLayout>
      <div className={clsx('flex', 'flex-row', 'gap-2.5', 'w-full')}>
        <span className={clsx('prose-other-medium', 'text-white/30')}>
          {t.rich('nftsCount', {
            count: nftsCount,
            bold: (text) => <span className={clsx('prose-other-bold', 'text-white/50')}>{text}</span>
          })}
        </span>
        <span className={clsx('prose-other-medium', 'text-white/30')}>
          {t.rich('listingsCount', {
            count: listingsCount,
            bold: (text) => <span className={clsx('prose-other-bold', 'text-white/50')}>{text}</span>
          })}
        </span>
        <span className={clsx('prose-other-medium', 'text-white/30')}>
          {t.rich('swapsCount', {
            count: swapsCount,
            bold: (text) => <span className={clsx('prose-other-bold', 'text-white/50')}>{text}</span>
          })}
        </span>
        <span className={clsx('prose-other-medium', 'text-white/30')}>
          {t.rich('offersCount', {
            count: offersCount,
            bold: (text) => <span className={clsx('prose-other-bold', 'text-white/50')}>{text}</span>
          })}
        </span>
      </div>
    </PaddedLayout>
  )
}
