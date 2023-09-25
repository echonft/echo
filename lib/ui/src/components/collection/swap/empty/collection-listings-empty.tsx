'use client'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EmptyViewContent } from '@echo/ui/components/layout/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CollectionListingsEmpty: FunctionComponent = () => {
  const t = useTranslations('collection.empty.swaps')
  return (
    <EmptyViewContent message={t('message')}>
      {/*TODO link*/}
      <InternalLink path={'#'}>
        <button className={clsx('btn-primary', 'group')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
