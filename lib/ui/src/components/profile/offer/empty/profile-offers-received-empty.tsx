import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EmptyViewContent } from '@echo/ui/components/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const ProfileOffersReceivedEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.offersReceived')
  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={linkProvider.profile.items.get()}>
        <button className={clsx('btn-primary', 'btn-size', 'group')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
