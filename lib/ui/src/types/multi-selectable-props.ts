export interface MultiSelectableProps<T> {
  selection: T[]
  onSelectionUpdate?: (selection: T[]) => unknown
}
