import { isNil, path as ramdaPath, type Path, pipe } from 'ramda'

function internalFn<V>(path: Path) {
  return function (obj: V) {
    return pipe(ramdaPath<V>(path), isNil)(obj)
  }
}

export function pathIsNil<V>(path: Path, obj: V): boolean
export function pathIsNil(path: Path): <V>(obj: V) => boolean
export function pathIsNil<V>(path: Path, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return internalFn<V>(path)
  }
  return internalFn<V>(path)(obj)
}
