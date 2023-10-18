'use client'
import { FiltersPanel } from '@echo/ui/components/layout/filters-panel'
import { CollectionFilterSelector } from '@echo/ui/components/nft/filters/by-collection/collection-filter-selector'
import { type CollectionFilter } from '@echo/ui/types/collection-filter'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  filters: CollectionFilter[]
  onToggleSelection?: (selection: CollectionFilter) => unknown
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ filters, onToggleSelection }) => {
  const t = useTranslations('user.filters.collection')

  return (
    <FiltersPanel title={t('title')}>
      {map(
        (filter) => (
          <CollectionFilterSelector key={filter.id} filter={filter} onToggleSelection={onToggleSelection} />
        ),
        filters
      )}
    </FiltersPanel>
  )
}
