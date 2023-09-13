import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface Group<T> {
  id: string
  name: string
  items: NonEmptyArray<T>
  disabled?: boolean
}
