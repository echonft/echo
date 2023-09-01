import { forEach, forEachObjIndexed, isNil } from 'ramda'

export function setUrlQuery<T extends Record<string, string | number | string[] | undefined>>(url: URL, query: T) {
  forEachObjIndexed<T>((value, key) => {
    const name = key as string
    if (!isNil(value)) {
      if (Array.isArray(value)) {
        forEach((arrayValue: string) => {
          url.searchParams.append(`${name}[]`, arrayValue)
        }, value)
      } else {
        url.searchParams.set(name, value.toString())
      }
    }
  }, query)
}
