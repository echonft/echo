export interface MultiSelectableProps<T> {
  selection?: T[]
  onAddSelection?: (id: T) => unknown
  onRemoveSelection?: (id: T) => unknown
}
