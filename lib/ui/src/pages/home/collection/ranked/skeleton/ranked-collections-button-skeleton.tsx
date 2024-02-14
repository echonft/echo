import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButtonSkeleton: FunctionComponent = () => {
  const t = useTranslations('home.rankedCollections')
  return (
    <button className={classes('btn-primary-reverse', 'btn-size', 'animate-pulse')} disabled={true}>
      <span className={classes('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
    </button>
  )
}
