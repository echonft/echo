import { getCollectionFiltersForNfts } from '../../../../helpers/nft/get-collection-filters-for-nfts'
import { CollectionFilter } from '../../../../types/collection-filter'
import { FiltersPanel } from '../../../layout/filters-panel'
import { CollectionFilterSelector } from './collection-filter-selector'
import { Nft } from '@echo/ui-model'
import { addToArrayIfNotPresent, removeFromArray } from '@echo/utils'
import { useTranslations } from 'next-intl'
import { any, equals, map, propEq } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: Nft[]
  selection: CollectionFilter[]
  onSelectionUpdate?: (selection: CollectionFilter[]) => unknown
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ nfts, selection, onSelectionUpdate }) => {
  const t = useTranslations('user.filters.collection')
  const filters = useMemo(() => getCollectionFiltersForNfts(nfts), [nfts])

  return (
    <FiltersPanel title={t('title')}>
      {map(
        (filter) => (
          <CollectionFilterSelector
            key={filter.id}
            filter={filter}
            selected={any(propEq(filter.id, 'id'))(selection ?? [])}
            onToggleSelection={(filter: CollectionFilter, selected: boolean) => {
              const newSelection = selected
                ? addToArrayIfNotPresent(selection, filter, equals)
                : removeFromArray(selection, filter, equals)
              onSelectionUpdate?.(newSelection)
            }}
          />
        ),
        filters
      )}
    </FiltersPanel>
  )
}
