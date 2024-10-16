'use client'
import type { Nft } from '@echo/model/types/nft/nft'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { getTraitFiltersForNfts } from '@echo/ui/helpers/nft/filters/get-trait-filters-for-nfts'
import type { TraitFilter } from '@echo/ui/types/trait-filter'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

export interface TraitFilterPanelProps {
  nfts: Nft[]
  selection: TraitFilter[]
  onToggleSelection?: (filter: TraitFilter) => void
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({ nfts, selection, onToggleSelection }) => {
  const t = useTranslations('collection.filters.traits')
  const filters = useMemo(() => getTraitFiltersForNfts(nfts), [nfts])

  if (isEmpty(filters)) {
    return null
  }

  return (
    <NftFiltersPanelLayout title={t('title')}>
      {filters.map(({ id, label, filters }) => {
        return (
          <TraitFilterPickerManager
            key={id}
            label={label}
            filters={filters}
            selection={selection}
            onToggleSelection={onToggleSelection}
          />
        )
      })}
    </NftFiltersPanelLayout>
  )
}
