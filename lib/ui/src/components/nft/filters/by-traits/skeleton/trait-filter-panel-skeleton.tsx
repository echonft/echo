import { FiltersPanelLayout } from '@echo/ui/components/layout/filters-panel-layout'
import { TraitFilterButtonSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-button-skeleton'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const TraitFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.filters.traits')
  return (
    <FiltersPanelLayout title={t('title')}>
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
    </FiltersPanelLayout>
  )
}
