import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EmptyViewContent } from '@echo/ui/components/layout/navigation/empty-view-content'
import { links } from '@echo/ui/constants/links'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const ProfileOffersCreatedEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.offersCreated')
  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={links.profile.items}>
        <button className={clsx('btn-primary', 'group', 'w-max', 'rounded-lg', 'px-5', 'py-2.5')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
