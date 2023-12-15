import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const RankedCollectionsButton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <InternalLink className={'group'} path={linkProvider.collection.all.get()}>
      <button className={clsx('btn-primary-reverse', 'btn-size')}>
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>
          {t('home.rankedCollections.btn')}
        </span>
      </button>
    </InternalLink>
  )
}
