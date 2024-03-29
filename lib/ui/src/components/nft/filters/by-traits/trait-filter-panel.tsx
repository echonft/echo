'use client'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import type { Selectable } from '@echo/ui/types/selectable'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

export interface TraitFilterPanelProps {
  filters: TraitFilterGroup[]
  onToggleSelection?: (filter: Selectable<TraitFilter>) => void
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({ filters, onToggleSelection }) => {
  const t = useTranslations('collection.filters.traits')

  if (isEmpty(filters)) {
    return null
  }

  return (
    <NftFiltersPanelLayout title={t('title')}>
      {filters.map(({ id, label, filters }) => {
        return (
          <TraitFilterPickerManager key={id} label={label} filters={filters} onToggleSelection={onToggleSelection} />
        )
      })}
    </NftFiltersPanelLayout>
  )
}
