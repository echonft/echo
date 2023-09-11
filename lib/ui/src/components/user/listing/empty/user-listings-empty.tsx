'use client'
import { links } from '../../../../constants/links'
import { InternalLink } from '../../../base/link/internal-link'
import { EmptyViewContent } from '../../../layout/navigation/empty-view-content'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  username: string
}

export const UserListingsEmpty: FunctionComponent<Props> = ({ username }) => {
  const t = useTranslations('user.empty.listings')

  return (
    <EmptyViewContent message={t('message')}>
      <InternalLink path={links.user.items(username)}>
        <button className={clsx('btn-primary', 'group', 'w-max', 'rounded-lg', 'px-5', 'py-2.5')}>
          <span className={clsx('prose-label-lg', 'btn-label-primary')}>{t('btn.label')}</span>
        </button>
      </InternalLink>
    </EmptyViewContent>
  )
}
