'use client'
import { FiltersPanelLayout } from '@echo/ui/components/layout/filters-panel-layout'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { useTranslations } from 'next-intl'
import { collectBy, head, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  filters: TraitFilter[]
  onToggleSelection?: (filter: TraitFilter) => unknown
}

export const TraitFilterPanel: FunctionComponent<Props> = ({ filters, onToggleSelection }) => {
  const t = useTranslations('collection.filters.traits')
  const groupedFilters = useMemo(() => collectBy(prop('trait'), filters), [filters])

  return (
    <FiltersPanelLayout title={t('title')}>
      {groupedFilters.map((filtersByTrait) => {
        const trait = head(filtersByTrait)!.trait
        return (
          <TraitFilterPickerManager
            key={trait}
            trait={trait}
            filters={filtersByTrait}
            onToggleSelection={onToggleSelection}
          />
        )
      })}
    </FiltersPanelLayout>
  )
}
