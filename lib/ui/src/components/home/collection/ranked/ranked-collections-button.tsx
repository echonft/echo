import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { links } from '@echo/ui/constants/links'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const RankedCollectionsButton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <InternalLink className={'group'} path={links.collection.all}>
      <button className={clsx('btn-primary-reverse')}>
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>
          {t('home.rankedCollections.btn')}
        </span>
      </button>
    </InternalLink>
  )
}
