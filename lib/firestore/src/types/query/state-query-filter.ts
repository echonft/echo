export interface StateQueryFilter<T extends string> {
  state?: T[]
  notState?: T[]
}
