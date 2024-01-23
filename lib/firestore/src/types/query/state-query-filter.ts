export interface StateQueryFilter<T extends string> {
  state?: readonly T[]
  notState?: readonly T[]
}
