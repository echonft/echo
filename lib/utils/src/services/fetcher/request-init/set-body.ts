import { assocPath, identity, isNil } from 'ramda'

export const setBody = <D = undefined>(body: D) =>
  isNil(body) ? identity<RequestInit> : assocPath<D, RequestInit>(['body'], body)
