import { equals, is, isNil, map, pipe, reject } from 'ramda'

export function removeNilProps<T, U = Partial<T>>(obj: T): U {
  return pipe<[T], unknown, unknown, U>(
    map((obj: unknown) => {
      if (is(Object, obj) && !is(Array, obj)) {
        return removeNilProps(obj)
      }
      if (is(Array, obj)) {
        return map((item) => (is(Object, item) ? removeNilProps(item) : item), obj)
      }
      return obj
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reject(isNil),
    reject(equals({}))
  )(obj) as U
}
