import { QueryType } from '@echo/utils'
import { forEach, forEachObjIndexed, isNil } from 'ramda'

export function setUrlQuery<T extends QueryType>(url: URL, query: T, addArrayBrackets = false) {
  forEachObjIndexed<T>((value, key) => {
    const name = key as string
    if (!isNil(value)) {
      if (Array.isArray(value)) {
        forEach((arrayValue: string) => {
          url.searchParams.append(addArrayBrackets ? `${name}[]` : name, arrayValue)
        }, value)
      } else {
        url.searchParams.set(name, value.toString())
      }
    }
  }, query)
}
