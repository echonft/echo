import { isNil, path, type Path, pipe } from 'ramda'

function innerPathIsNil<V>(arg: Path) {
  return function (obj: V) {
    return pipe(path<V>(arg), isNil)(obj)
  }
}

export function pathIsNil<V>(path: Path, obj: V): boolean
export function pathIsNil(path: Path): <V>(obj: V) => boolean
export function pathIsNil<V>(path: Path, obj?: V): boolean | ((obj: V) => boolean) {
  if (isNil(obj)) {
    return innerPathIsNil<V>(path)
  }
  return innerPathIsNil<V>(path)(obj)
}
