import { equals, is, isNil, map, pipe, reject } from 'ramda'

export function removeNilProps<T extends object>(obj: T): T {
  return pipe<[T], unknown, unknown, T>(
    map((obj: unknown) => {
      if (is(Object, obj) && !is(Array, obj)) {
        return removeNilProps<T>(obj as T)
      }
      if (is(Array, obj)) {
        return map((item) => (is(Object, item) ? removeNilProps<T>(item as T) : item), obj)
      }
      return obj
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reject(isNil),
    reject(equals({}))
  )(obj) as T
}
