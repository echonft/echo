import { FiltersPanel } from '../../../collection/filters/filters-panel'
import { TraitFilterButtonSkeleton } from './trait-filter-button-skeleton'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const TraitFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.filters.traits')
  return (
    <FiltersPanel>
      <h2 className={clsx('prose-label-sm-semi', 'text-white/50', 'py-1')}>{t('title')}</h2>
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
    </FiltersPanel>
  )
}
