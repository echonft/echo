export type NonEmptyObject<T extends Record<string | number | symbol, unknown>> = Record<
  string | number | symbol,
  never
> extends T
  ? never
  : T
