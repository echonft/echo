import type { Nullable } from '@echo/utils/types/nullable'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object | Nullable<object>
      ? DeepPartial<T[P]>
      : T[P]
}
