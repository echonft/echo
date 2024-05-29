'use client'
import { TraitFilterPicker } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { isEmpty } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  label: string
  filters: TraitFilter[]
  selection: TraitFilter[]
  onToggleSelection?: (filter: TraitFilter) => void
}

export const TraitFilterPickerManager: FunctionComponent<Props> = ({
  label,
  filters,
  selection,
  onToggleSelection
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TraitFilterPicker
      label={label}
      filters={filters}
      selection={selection}
      collapsed={collapsed}
      onToggleCollapsed={(collapsed) => {
        // can't collapse if at least one filter is selected
        if (!collapsed && !isEmpty(selection)) {
          return
        }
        setCollapsed(collapsed)
      }}
      onToggleSelection={onToggleSelection}
    />
  )
}
