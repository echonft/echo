'use client'
import { TraitFilterPicker } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker'
import { getSelectionCount } from '@echo/ui/helpers/selectable/get-selection-count'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { type FunctionComponent, useMemo, useState } from 'react'

interface Props {
  trait: string
  filters: TraitFilter[]
  onToggleSelection?: (filter: TraitFilter) => unknown
}

export const TraitFilterPickerManager: FunctionComponent<Props> = ({ trait, filters, onToggleSelection }) => {
  const [collapsed, setCollapsed] = useState(false)
  const selectionCount = useMemo(() => getSelectionCount(filters), [filters])
  return (
    <TraitFilterPicker
      trait={trait}
      filters={filters}
      collapsed={collapsed}
      selectionCount={selectionCount}
      onToggleCollapsed={(collapsed) => {
        // can't collapse if at least one filter is selected
        if (!collapsed && selectionCount > 0) {
          return
        }
        setCollapsed(collapsed)
      }}
      onToggleSelection={onToggleSelection}
    />
  )
}
