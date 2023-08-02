import { TraitFilterGroup } from '../../../model/trait-filter'
import { TraitFilterPanel } from './trait-filter-panel'
import { FunctionComponent, useState } from 'react'

export interface DataProvidedTraitFilterPanelProps {
  traitFilterGroups: TraitFilterGroup[]
  initialSelections?: Map<string, string[]>
  onSelectionChanged?: (selection: Map<string, string[]>) => unknown
  onSearchQueryChange?: (searchQuery: string) => unknown
}

export const DataProvidedTraitFilterPanel: FunctionComponent<DataProvidedTraitFilterPanelProps> = ({
  traitFilterGroups,
  initialSelections,
  onSelectionChanged,
  onSearchQueryChange
}) => {
  const [selections, setSelection] = useState(initialSelections ?? new Map<string, string[]>())
  return (
    <TraitFilterPanel
      traitFilterGroups={traitFilterGroups}
      initialSelections={selections}
      onSelectionUpdate={(type, selection) => {
        selections.set(type, selection)
        const newSelections = new Map(selections)
        setSelection(newSelections)
        onSelectionChanged?.(newSelections)
        selections.clear()
      }}
      onSearchQueryChange={onSearchQueryChange}
    />
  )
}
