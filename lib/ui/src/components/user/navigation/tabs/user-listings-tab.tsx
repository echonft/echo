'use client'
import { Tab } from '@echo/ui/components/base/navigation/tab'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  show?: boolean
}

export const UserListingsTab: FunctionComponent<Props> = ({ show }) => {
  const t = useTranslations('user.navigation')
  if (show) {
    return <Tab>{t('listings')}</Tab>
  }
  return null
}
