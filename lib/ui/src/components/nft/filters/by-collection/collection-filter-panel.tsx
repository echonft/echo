'use client'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { NftFilter } from '@echo/ui/components/nft/filters/nft-filter'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { Selectable } from '@echo/ui/types/selectable'
import { useTranslations } from 'next-intl'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  filters: Selectable<CollectionFilter>[]
  onToggleSelection?: (filter: Selectable<CollectionFilter>) => void
}

export const CollectionFilterPanel: FunctionComponent<Props> = ({ filters, onToggleSelection }) => {
  const t = useTranslations('user.filters.collection')
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
