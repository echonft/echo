'use client'
import { InternalLink } from '../../../base/link/internal-link'
import { EmptyViewContent } from '../../../layout/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const CollectionSwapsEmpty: FunctionComponent = () => {
  const t = useTranslations('collection.empty.swaps')
  return (
    <EmptyViewContent message={t('message')}>
      {/*TODO link*/}
      <InternalLink path={'#'}>
        <button className={clsx('btn-primary', 'group', 'w-max', 'rounded-lg', 'px-5', 'py-2.5')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
