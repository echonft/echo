import { FiltersPanel } from '@echo/ui/components/layout/filters-panel'
import { CollectionFilterSelector } from '@echo/ui/components/nft/filters/by-collection/collection-filter-selector'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nft } from '@echo/ui/types/model/nft'
import { addToArrayIfNotPresent } from '@echo/utils/array/add-to-array-if-not-present'
import { removeFromArray } from '@echo/utils/array/remove-from-array'
import { useTranslations } from 'next-intl'
import { any, equals, map, propEq } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

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
