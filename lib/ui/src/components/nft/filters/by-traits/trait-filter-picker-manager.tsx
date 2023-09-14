'use client'
import { TraitFilterPicker } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker'
import type { NftTraitValue } from '@echo/ui/types/model/nft-trait-value'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

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
