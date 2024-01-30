import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionSwapsEmpty: FunctionComponent = () => {
  const t = useTranslations('collection.empty.swaps')
  return (
    <EmptyViewContent message={t('message')}>
      {/*TODO link*/}
      <InternalLink path={'#'}>
        <button className={clsx('btn-primary', 'btn-size', 'group')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
