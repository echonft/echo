'use client'
import type { Nft } from '@echo/model/types/nft'
import { withIdEquals } from '@echo/ui/comparators/with-id-equals'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { filterNftsByTraits } from '@echo/ui/helpers/nft/filter-nfts-by-traits'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import type { Selectable } from '@echo/ui/types/selectable'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { useTranslations } from 'next-intl'
import { flatten, isEmpty, map, modify, partialRight, pipe, prop } from 'ramda'
import { useEffect, useState } from 'react'

export interface TraitFilterPanelProps<T extends Nft> {
  nfts: T[]
  onNftsFiltered: (nfts: T[]) => unknown
}

export const TraitFilterPanel = <T extends Nft>({ nfts, onNftsFiltered }: TraitFilterPanelProps<T>) => {
  const t = useTranslations('collection.filters.traits')
  const [filters, setFilters] = useState<TraitFilterGroup[]>([])
  const onToggleSelection = (selection: Selectable<TraitFilter>) => {
    const updatedGroupedFilters = map<TraitFilterGroup, TraitFilterGroup>(
      modify('filters', toggleSelectionInList(withIdEquals(selection)))
    )(filters)
    setFilters(updatedGroupedFilters)
    const filteredNfts = pipe<[TraitFilterGroup[]], Selectable<TraitFilter>[][], Selectable<TraitFilter>[], T[]>(
      map(pipe(prop('filters'), getSelectionInList)),
      flatten,
      partialRight(filterNftsByTraits, [nfts])
    )(updatedGroupedFilters)
    onNftsFiltered?.(filteredNfts)
  }

  // set the initial grouped filters reset trait filters when the underlying NFTs change
  useEffect(() => {
    pipe(getTraitFiltersForNfts, setFilters)(nfts)
  }, [nfts])

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
