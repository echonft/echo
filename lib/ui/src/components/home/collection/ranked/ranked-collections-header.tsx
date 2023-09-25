import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const RankedCollectionsHeader: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <div className={clsx('flex', 'flex-row', 'px-5', 'pb-7.5', 'grow', 'justify-between')}>
      <div className={clsx('flex', 'flex-row', 'gap-9', 'w-max')}>
        <span className={clsx('prose-header-sm', 'text-white/50')}>{t('home.rankedCollections.rank')}</span>
        <span className={clsx('prose-header-sm', 'text-white/50')}>{t('home.rankedCollections.collection')}</span>
      </div>
      <span className={clsx('prose-header-sm', 'text-white/50')}>{t('home.rankedCollections.swapsCount')}</span>
    </div>
  )
}
