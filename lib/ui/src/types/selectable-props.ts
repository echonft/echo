export interface SelectableProps<T> {
  selected?: boolean
  onToggleSelection?: (id: T, selected: boolean) => unknown
}
