import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButton: FunctionComponent = () => {
  const t = useTranslations('home.rankedCollections')
  return (
    <InternalLink className={'group'} path={frontendRoutes.collection.all.get()}>
      <button className={clsx('btn-primary', 'group')}>
        <span className={clsx('btn-label-primary')}>{t('btn')}</span>
      </button>
    </InternalLink>
  )
}
