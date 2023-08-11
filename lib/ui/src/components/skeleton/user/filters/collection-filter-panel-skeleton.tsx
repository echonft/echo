import { FiltersPanel } from '../../../layout/filters-panel'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const CollectionFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('user.filters.collection')
  return <FiltersPanel title={t('title')} className={clsx('animate-pulse', '!h-[15rem]')} />
}
