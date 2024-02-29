'use client'
import type { Nft } from '@echo/model/types/nft'
import { withIdEquals } from '@echo/ui/comparators/with-id-equals'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { NftFilter } from '@echo/ui/components/nft/filters/nft-filter'
import { filterNftsByCollections } from '@echo/ui/helpers/nft/filter-nfts-by-collections'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { getSelectionInList } from '@echo/ui/helpers/selectable/get-selection-in-list'
import { toggleSelectionInList } from '@echo/ui/helpers/selectable/toggle-selection-in-list'
import { unselect } from '@echo/ui/helpers/selectable/unselect'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Selectable } from '@echo/ui/types/selectable'
import { useTranslations } from 'next-intl'
import { map, partialRight, pipe, unless } from 'ramda'
import { useState } from 'react'

interface Props<T extends Nft> {
  nfts: T[]
  onNftsFiltered: (nfts: T[]) => unknown
}

export const CollectionFilterPanel = <T extends Nft>({ nfts, onNftsFiltered }: Props<T>) => {
  const t = useTranslations('user.filters.collection')
  const [filters, setFilters] = useState<Selectable<CollectionFilter>[]>(getCollectionFiltersForNfts(nfts))
  const onToggleSelection = (selection: Selectable<CollectionFilter>) => {
    const updatedFilters = pipe(
      map(unless(withIdEquals(selection), unselect<CollectionFilter>)),
      toggleSelectionInList(withIdEquals(selection))
    )(filters)
    setFilters(updatedFilters)
    const filteredNfts = pipe<[Selectable<CollectionFilter>[]], Selectable<CollectionFilter>[], T[]>(
      getSelectionInList,
      partialRight(filterNftsByCollections, [nfts])
    )(updatedFilters)
    onNftsFiltered?.(filteredNfts)
  }

  return (
    <NftFiltersPanelLayout title={t('title')}>
      {map(
        (filter) => (
          <NftFilter key={filter.id} filter={filter} onToggleSelection={onToggleSelection} />
        ),
        filters
      )}
    </NftFiltersPanelLayout>
  )
}
