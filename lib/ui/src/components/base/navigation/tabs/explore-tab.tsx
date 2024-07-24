'use client'
import { Tab } from '@echo/ui/components/base/navigation/tabs/tab'
import { ExploreIconSvg } from '@echo/ui/components/base/svg/explore-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  show?: boolean
}

export const ExploreTab: FunctionComponent<Props> = ({ show }) => {
  const t = useTranslations('layout.tab')
  if (show) {
    return (
      <Tab>
        <div className={clsx('flex', 'flex-row', 'gap-2.5', 'items-center')}>
          <span className={clsx('prose-label-md', 'text-yellow-500', 'select-none')}>{t('explore')}</span>
          <span className={clsx('text-yellow-500', 'select-none')}>
            <ExploreIconSvg />
          </span>
        </div>
      </Tab>
    )
  }
  return null
}
