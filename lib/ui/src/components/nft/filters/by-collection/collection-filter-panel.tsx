'use client'
import type { Nft } from '@echo/model/types/nft'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { NftFilter } from '@echo/ui/components/nft/filters/nft-filter'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-collection-filters-for-nfts'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { useTranslations } from 'next-intl'
import { assoc, isNil, map } from 'ramda'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  nfts: Nft[]
  onSelect?: (filter: CollectionFilter) => void
  onUnselect?: VoidFunction
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ nfts, onSelect, onUnselect }) => {
  const t = useTranslations('user.filters.collection')
  const [selection, setSelection] = useState<string>()
  const filters = useMemo(() => getCollectionFiltersForNfts(nfts), [nfts])

  const onToggleSelection = useCallback(
    (filter: CollectionFilter) => {
      const { id } = filter
      if (isNil(selection) || selection !== id) {
        setSelection(id)
        onSelect?.(filter)
      } else {
        setSelection(undefined)
        onUnselect?.()
      }
    },
    [selection, onSelect, onUnselect]
  )

  return (
    <NftFiltersPanelLayout title={t('title')}>
      {map(
        (filter) => (
          <NftFilter
            key={filter.id}
            filter={filter.id === selection ? assoc('selected', true, filter) : filter}
            onToggleSelection={onToggleSelection}
          />
        ),
        filters
      )}
    </NftFiltersPanelLayout>
  )
}
