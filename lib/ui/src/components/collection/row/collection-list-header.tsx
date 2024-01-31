import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionListHeader: FunctionComponent = () => {
  const t = useTranslations('collection.list.header')
  return (
    <div className={clsx('flex', 'flex-row', 'px-5', 'pb-7.5', 'grow', 'justify-between')}>
      <div className={clsx('flex', 'flex-row', 'gap-9', 'w-max')}>
        <span className={clsx('prose-header-sm', 'text-white/50')}>{t('rank')}</span>
        <span className={clsx('prose-header-sm', 'text-white/50')}>{t('collection')}</span>
      </div>
      <span className={clsx('prose-header-sm', 'text-white/50')}>{t('swapsCount')}</span>
    </div>
  )
}
