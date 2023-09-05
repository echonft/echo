import { isNil, path as ramdaPath, pipe } from 'ramda'

function internalFn<V>(path: Array<string | number>) {
  return function (obj: V) {
    return pipe(ramdaPath(path), isNil)(obj)
  }
}

export function pathIsNil<V>(path: Array<string | number>, obj: V): boolean
export function pathIsNil(path: Array<string | number>): <V>(obj: V) => boolean
export function pathIsNil<V>(path: Array<string | number>, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V>(path)
  }
  return internalFn<V>(path)(obj)
}
