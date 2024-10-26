'use client'
import { eqFilter } from '@echo/model/helpers/filter/eq-filter'
import type { Nft } from '@echo/model/types/nft'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { NftFilter } from '@echo/ui/components/nft/filters/nft-filter'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-collection-filters-for-nfts'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isNil, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: Nft[]
  selection: Nullable<CollectionFilter>
  onToggleSelection?: (filter: CollectionFilter) => void
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ nfts, selection, onToggleSelection }) => {
  const t = useTranslations('user.filters.collection')
  const filters = useMemo(() => getCollectionFiltersForNfts(nfts), [nfts])

  return (
    <NftFiltersPanelLayout title={t('title')}>
      {map(
        (filter) => (
          <NftFilter
            key={filter.id}
            filter={filter}
            selected={!isNil(selection) && eqFilter(filter, selection)}
            onToggleSelection={onToggleSelection}
          />
        ),
        filters
      )}
    </NftFiltersPanelLayout>
  )
}
