import { FiltersPanel } from '../../layout/filters-panel'
import { CollectionFilterSelector } from './collection-filter-selector'
import { CollectionFilter } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { any, propEq } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  filters: CollectionFilter[]
  selection?: CollectionFilter[]
  onSelectionUpdate?: (filter: CollectionFilter, selected: boolean) => unknown
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ filters, selection, onSelectionUpdate }) => {
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
