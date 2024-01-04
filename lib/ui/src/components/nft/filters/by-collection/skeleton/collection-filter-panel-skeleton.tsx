import { FiltersPanelLayout } from '@echo/ui/components/layout/filters-panel-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('user.filters.collection')
  return <FiltersPanelLayout title={t('title')} className={clsx('animate-pulse', '!h-[15rem]')} />
}
