import { pathProvider } from '@echo/api/routing/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
}

export const UserSwapsEmpty: FunctionComponent<Props> = ({ username }) => {
  const t = useTranslations('user.empty.swaps')
  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={pathProvider.user.items.get({ username })}>
        <button className={clsx('btn-primary', 'btn-size', 'group')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
