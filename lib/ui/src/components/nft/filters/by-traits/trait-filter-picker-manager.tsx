'use client'
import type { TraitFilterGroup } from '../../../../types/trait-filter-group'
import { TraitFilterPicker } from './trait-filter-picker'
import type { NftTraitValue } from '@echo/ui-model'
import { isEmpty, isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'

interface Props {
  traitFilterGroup: TraitFilterGroup
  initialSelection?: NftTraitValue[]
  onSelectionUpdate?: (selection: NftTraitValue[]) => unknown
}

export const TraitFilterPickerManager: FunctionComponent<Props> = ({
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
      onSelectionUpdate={(newSelection) => {
        setSelection(newSelection)
        onSelectionUpdate?.(newSelection)
      }}
    />
  )
}
