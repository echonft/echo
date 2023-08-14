import { TraitFilterGroup } from '../../../types/model/trait-filter'
import { NftTraitValue } from '../../../types/nft-traits'
import { TraitFilterPicker } from './trait-filter-picker'
import { concat, isEmpty, isNil, without } from 'ramda'
import { FunctionComponent, useState } from 'react'

export interface TraitFilterPickerManagerProps {
  traitFilterGroup: TraitFilterGroup
  initialSelection?: NftTraitValue[]
  onSelectionUpdate?: (selection: NftTraitValue[]) => unknown
}

export const TraitFilterPickerManager: FunctionComponent<TraitFilterPickerManagerProps> = ({
  traitFilterGroup,
  initialSelection,
  onSelectionUpdate
}) => {
  const [collapsed, setCollapsed] = useState(isNil(initialSelection) ? false : !isEmpty(initialSelection))
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
      onRemoveSelection={(value) => {
        const newSelection = without([value], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
      onAddSelection={(value) => {
        const newSelection = concat([value], selection)
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
    />
  )
}
