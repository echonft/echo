import type { Primitive } from 'zod'

export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends (infer U)[]
    ? DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : Partial<T>
