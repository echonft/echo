export interface Selectable {
  selected?: true
}

export type SelectableType<T> = T & Partial<Record<'selected', true>>
