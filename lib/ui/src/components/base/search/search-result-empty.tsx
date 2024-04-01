'use client'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const SearchResultEmpty: FunctionComponent = () => {
  const t = useTranslations('search')

  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'h-16', 'px-4.5', 'items-center', 'rounded-lg')}>
      <span className={clsx('prose-label-md', 'text-white', 'truncate')}>{t('emptyResults')}</span>
    </div>
  )
}
