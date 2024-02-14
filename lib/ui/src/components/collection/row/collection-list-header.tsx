import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionListHeader: FunctionComponent = () => {
  const t = useTranslations('collection.list.header')
  return (
    <div className={classes('flex', 'flex-row', 'px-5', 'pb-7.5', 'grow', 'justify-between')}>
      <div className={classes('flex', 'flex-row', 'gap-9', 'w-max')}>
        <span className={classes('prose-header-sm', 'text-white/50')}>{t('rank')}</span>
        <span className={classes('prose-header-sm', 'text-white/50')}>{t('collection')}</span>
      </div>
      <span className={classes('prose-header-sm', 'text-white/50')}>{t('swapsCount')}</span>
    </div>
  )
}
