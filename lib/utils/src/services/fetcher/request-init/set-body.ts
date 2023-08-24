import { FetcherData } from '../../../types/fetcher-data'
import { assocPath, identity, isNil } from 'ramda'

export const setBody = <D extends FetcherData = undefined>(body: D) =>
  isNil(body) ? identity<RequestInit> : assocPath<object, RequestInit>(['body'], body)
