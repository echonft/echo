'use client'
import { TraitFilterPicker } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker'
import { getSelectionCount } from '@echo/ui/helpers/selectable/get-selection-count'
import type { Selectable } from '@echo/ui/types/selectable'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { type FunctionComponent, useMemo, useState } from 'react'

interface Props {
  label: string
  filters: Selectable<TraitFilter>[]
  onToggleSelection?: (filter: Selectable<TraitFilter>) => void
}

export const TraitFilterPickerManager: FunctionComponent<Props> = ({ label, filters, onToggleSelection }) => {
  const [collapsed, setCollapsed] = useState(false)
  const selectionCount = useMemo(() => getSelectionCount(filters), [filters])
  return (
    <TraitFilterPicker
      label={label}
      filters={filters}
      collapsed={collapsed}
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
