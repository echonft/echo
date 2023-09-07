import { isNil } from 'ramda'

function internalFn(searchQuery: string): (str: string) => boolean {
  return function (str: string): boolean {
    return str.includes(searchQuery)
  }
}

export function stringIncludes(searchQuery: string, str: string): boolean
export function stringIncludes(searchQuery: string): (str: string) => boolean
export function stringIncludes(searchQuery: string, str?: string): boolean | ((str: string) => boolean) {
  if (isNil(str)) {
    return internalFn(searchQuery)
  }
  return internalFn(searchQuery)(str)
}
