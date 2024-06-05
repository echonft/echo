import { fromPairs, is, map, pipe, toPairs } from 'ramda'

type TransformBigIntToNumber<T> = T extends bigint
  ? number
  : T extends (infer U)[]
    ? TransformBigIntToNumber<U>[]
    : T extends object
      ? { [K in keyof T]: TransformBigIntToNumber<T[K]> }
      : T

export function deepMapBigintToNumber<T>(obj: T): TransformBigIntToNumber<T> {
  if (is(Array, obj)) {
    return map(deepMapBigintToNumber, obj) as unknown as TransformBigIntToNumber<T>
  } else if (is(Object, obj)) {
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toPairs,
      map(([key, value]) => [key, is(BigInt, value) ? Number(value) : deepMapBigintToNumber(value)]),
      fromPairs
    )(obj) as TransformBigIntToNumber<T>
  } else {
    return obj as TransformBigIntToNumber<T>
  }
}
