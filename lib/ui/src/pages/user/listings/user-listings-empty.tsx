import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
}

export const UserListingsEmpty: FunctionComponent<Props> = ({ username }) => {
  const t = useTranslations('user.empty.listings')

  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={linkProvider.user.items.get({ username })}>
        <button className={classes('btn-primary', 'btn-size', 'group')}>
          <span className={classes('prose-label-lg', 'btn-label-primary')}>{t('btn')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
