// TODO Naming should be changed as it is used in tag manager too.
// Maybe something like MappableObject?
export interface SearchableObject<T> {
  id: string | number
  label: string
  value: T
}
