import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButton: FunctionComponent = () => {
  const t = useTranslations('home.rankedCollections')
  return (
    <InternalLink className={'group'} path={linkProvider.collection.all.get()}>
      <button className={classes('btn-primary-reverse', 'btn-size', 'group')}>
        <span className={classes('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </InternalLink>
  )
}
