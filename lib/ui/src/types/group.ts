import { NonEmptyArray } from '@echo/utils'

export interface Group<T> {
  id: string
  name: string
  items: NonEmptyArray<T>
}
