import { equals, path as ramdaPath } from 'ramda'

export function eqPaths<T, U = T>(path: string[]): (objA: T, objB: U) => boolean {
  return function <T, U>(objA: T, objB: U): boolean {
    return equals(ramdaPath(path, objA), ramdaPath(path, objB))
  }
}
