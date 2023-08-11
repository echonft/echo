import { FiltersPanel } from '../../../layout/filters-panel'
import { TraitFilterButtonSkeleton } from './trait-filter-button-skeleton'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const TraitFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.filters.traits')
  return (
    <FiltersPanel title={t('title')}>
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
    </FiltersPanel>
  )
}
