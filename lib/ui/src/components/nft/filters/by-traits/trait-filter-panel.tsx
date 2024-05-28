'use client'
import { eqWithId } from '@echo/model/helpers/eq-with-id'
import type { Nft } from '@echo/model/types/nft'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-trait-filters-for-nfts'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import type { Selectable } from '@echo/ui/types/selectable'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { useTranslations } from 'next-intl'
import { always, filter, flatten, isEmpty, map, modify, pipe, prop, tap } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

export interface TraitFilterPanelProps {
  nfts: Nft[]
  onSelectionUpdate?: (selection: Selectable<TraitFilter>[]) => void
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({ nfts, onSelectionUpdate }) => {
  const t = useTranslations('collection.filters.traits')
  const [filters, setFilters] = useState<TraitFilterGroup[]>([])

  // update the filters when the underlying NFTs change
  useEffect(() => {
    setFilters(always(getTraitFiltersForNfts(nfts)))
  }, [nfts])

  const onToggleSelection = (selection: Selectable<TraitFilter>) => {
    setFilters(
      pipe(
        map(modify('filters', toggleSelectionInList(eqWithId(selection)))),
        tap(
          pipe<
            [TraitFilterGroup[]],
            Selectable<TraitFilter>[][],
            Selectable<TraitFilter>[],
            Selectable<TraitFilter>[],
            unknown
          >(map(prop('filters')), flatten, filter(isSelected<TraitFilter>), (selection) => {
            onSelectionUpdate?.(selection)
          })
        )
      )
    )
  }

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
