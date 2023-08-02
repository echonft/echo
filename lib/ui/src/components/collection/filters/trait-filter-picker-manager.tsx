import { TraitFilterGroup } from '../../../model/trait-filter'
import { TraitFilterPicker } from './trait-filter-picker'
import { concat, isEmpty, isNil, without } from 'ramda'
import { FunctionComponent, useState } from 'react'

export interface TraitFilterPickerManagerProps {
  traitFilterGroup: TraitFilterGroup
  initialSelection?: string[]
  onSelectionUpdate?: (selection: string[]) => unknown
}

export const TraitFilterPickerManager: FunctionComponent<TraitFilterPickerManagerProps> = ({
  traitFilterGroup,
  initialSelection,
  onSelectionUpdate
}) => {
  const [collapsed, setCollapsed] = useState(isNil(initialSelection) ? false : isEmpty(initialSelection))
  const [selection, setSelection] = useState(initialSelection ?? [])
  return (
    <TraitFilterPicker
      traitFilterGroup={traitFilterGroup}
      collapsed={collapsed}
      onToggleCollapsed={(collapsed) => {
        // can't collapse if at least one filter is selected
        if (!collapsed && !isEmpty(selection)) {
          return
        }
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
