import { CollectionFilter } from '../../../types/model/collection-filter'
import { FiltersPanel } from '../../layout/filters-panel'
import { CollectionFilterSelector } from './collection-filter-selector'
import { useTranslations } from 'next-intl'
import { any, propEq } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionFilterPanelProps {
  filters: CollectionFilter[]
  selection?: CollectionFilter[]
  onSelectionUpdate?: (filter: CollectionFilter, selected: boolean) => unknown
}

export const CollectionFilterPanel: FunctionComponent<CollectionFilterPanelProps> = ({
  filters,
  selection,
  onSelectionUpdate
}) => {
  const t = useTranslations('user.filters.collection')
  return (
    <FiltersPanel title={t('title')}>
      {filters.map((filter) => (
        <CollectionFilterSelector
          key={filter.id}
          filter={filter}
          selected={any(propEq(filter, 'id'))(selection ?? [])}
          onToggleSelection={onSelectionUpdate}
        />
      ))}
    </FiltersPanel>
  )
}
