'use client'
import type { Nft } from '@echo/model/types/nft'
import type { NftAttribute } from '@echo/model/types/nft-attribute'
import { traitFilterEquals } from '@echo/ui/comparators/trait-filter-equals'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/get-trait-filters-for-nfts'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { intersects } from '@echo/utils/fp/intersects'
import { useTranslations } from 'next-intl'
import { collectBy, filter, flatten, head, isEmpty, isNil, map, pick, pipe, prop, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  nfts: Nft[]
  onNftsFiltered: (nfts: Nft[]) => unknown
}

export const TraitFilterPanel: FunctionComponent<Props> = ({ nfts, onNftsFiltered }) => {
  const t = useTranslations('collection.filters.traits')
  const [groupedFilters, setGroupedFilters] = useState<TraitFilter[][]>([[]])
  const onToggleSelection = (traitFilter: TraitFilter) => {
    const updatedGroupFilters = map(toggleSelectionInList<TraitFilter>(traitFilterEquals(traitFilter)), groupedFilters)
    setGroupedFilters(updatedGroupFilters)
    const selectedFilters = pipe(map(getSelectionInList<TraitFilter>), flatten)(updatedGroupFilters)
    if (isEmpty(selectedFilters)) {
      onNftsFiltered?.(nfts)
    } else {
      const filterAttributes = map(pick(['trait', 'value']), selectedFilters)
      onNftsFiltered?.(
        filter(pipe<[Nft], NftAttribute[], boolean>(prop('attributes'), intersects(filterAttributes)), nfts)
      )
    }
  }

  // set the initial grouped filters reset trait filters when the underlying NFTs change
  useEffect(() => {
    pipe(getTraitFiltersForNfts, collectBy(prop('trait')), reject(isEmpty), setGroupedFilters)(nfts)
  }, [nfts])

  if (isEmpty(groupedFilters)) {
    return null
  }
  return (
    <NftFiltersPanelLayout title={t('title')}>
      {groupedFilters.map((filters) => {
        const trait = head(filters)
        if (isNil(trait)) {
          return null
        }
        return (
          <TraitFilterPickerManager
            key={trait.trait}
            trait={trait.trait}
            filters={filters}
            onToggleSelection={onToggleSelection}
          />
        )
      })}
    </NftFiltersPanelLayout>
  )
}
