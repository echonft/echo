import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionSearchNoResults: FunctionComponent = () => {
  const t = useTranslations('collection.search')

  return (
    <div className={classes('rounded-lg', 'p-2', 'flex', 'flex-row', 'h-24', 'w-96', 'items-center', 'justify-center')}>
      <span className={classes('prose-header-sm-semi', 'text-white')}>{t('emptyResults')}</span>
    </div>
  )
}
