import { TraitFilterGroup } from '../../../model/trait-filter'
import { TraitFilterPicker } from './trait-filter-picker'
import { concat, without } from 'ramda'
import { FunctionComponent, useState } from 'react'

export interface TraitFilterPickerManagerProps {
  traitFilterGroup: TraitFilterGroup
  initialCollapsedState?: boolean
  initialSelection?: string[]
  onSelectionUpdate?: (selection: string[]) => unknown
}

export const TraitFilterPickerManager: FunctionComponent<TraitFilterPickerManagerProps> = ({
  traitFilterGroup,
  initialCollapsedState,
  initialSelection,
  onSelectionUpdate
}) => {
  const [collapsed, setCollapsed] = useState(initialCollapsedState ?? false)
  const [selection, setSelection] = useState(initialSelection ?? [])
  return (
    <TraitFilterPicker
      traitFilterGroup={traitFilterGroup}
      collapsed={collapsed}
      onToggleCollapsed={(collapsed) => {
        setCollapsed(collapsed)
      }}
      selection={selection}
      onRemoveSelection={(id) => {
        const newSelection = without([id], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
      onAddSelection={(id) => {
        const newSelection = concat([id], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
    />
  )
}
