import { TraitFilterButtonSkeleton } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-button-skeleton'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const TraitFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.filters.traits')
  return (
    <NftFiltersPanelLayout title={t('title')}>
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
      <TraitFilterButtonSkeleton />
    </NftFiltersPanelLayout>
  )
}
