import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButtonSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <button className={clsx('btn-primary-reverse', 'btn-size', 'animate-pulse')} disabled={true}>
      <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>
        {t('home.rankedCollections.btn')}
      </span>
    </button>
  )
}
