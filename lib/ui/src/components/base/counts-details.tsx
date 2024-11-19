'use client'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  listingsCount: number
  nftsCount: number
  offersCount: number
  swapsCount: number
}

export const CountsDetails: FunctionComponent<Props> = ({ listingsCount, nftsCount, offersCount, swapsCount }) => {
  const t = useTranslations('counts')
  return (
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
  )
}
