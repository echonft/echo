import type { NonEmptyArray } from '@echo/utils/types'

export interface Group<T> {
  id: string
  name: string
  items: NonEmptyArray<T>
  disabled?: boolean
}
