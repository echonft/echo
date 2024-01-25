import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButtonSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.rankedCollections')
  return (
    <button className={clsx('btn-primary-reverse', 'btn-size', 'animate-pulse')} disabled={true}>
      <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
    </button>
  )
}
