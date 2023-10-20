'use client'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EmptyViewContent } from '@echo/ui/components/layout/navigation/empty-view-content'
import { links } from '@echo/ui/constants/links'
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
      <InternalLink path={links.user.items(username)}>
        <button className={clsx('btn-primary', 'btn-size', 'group')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
