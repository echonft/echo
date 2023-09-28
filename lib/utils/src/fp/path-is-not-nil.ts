import { complement, isNil, path as ramdaPath, pipe } from 'ramda'

function internalFn<V>(path: (string | number)[]) {
  return function (obj: V) {
    return pipe(ramdaPath(path), complement(isNil))(obj)
  }
}

export function pathIsNotNil<V>(path: (string | number)[], obj: V): boolean
export function pathIsNotNil(path: (string | number)[]): <V>(obj: V) => boolean
export function pathIsNotNil<V>(path: (string | number)[], obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V>(path)
  }
  return internalFn<V>(path)(obj)
}
