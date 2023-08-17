import { modify, prop } from 'ramda'

export const urlPropToString = <K extends string>(propKey: K) => modify<K, URL, string>(propKey, prop('href'))
