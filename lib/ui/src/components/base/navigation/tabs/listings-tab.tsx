'use client'
import { Tab } from '@echo/ui/components/base/navigation/tabs/tab'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  show?: boolean
}

export const ListingsTab: FunctionComponent<Props> = ({ show }) => {
  const t = useTranslations('layout.tab')
  if (show) {
    return <Tab>{t('listings')}</Tab>
  }
  return null
}
