import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const ProfilePendingOffersEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.pendingOffers')
  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={linkProvider.profile.items.get()}>
        <button className={classes('btn-primary', 'btn-size', 'group')}>
          <span className={classes('prose-label-lg', 'btn-label-primary')}>{t('btn')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
