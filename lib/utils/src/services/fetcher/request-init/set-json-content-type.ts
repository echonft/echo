import { allPass, assoc, assocPath, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const setJsonContentType = ifElse<[RequestInit], RequestInit, RequestInit>(
  allPass([has('headers'), pipe(prop('headers'), complement(isNil))]),
  assocPath(['headers', 'Content-Type'], 'application/json'),
  assoc('headers', { 'Content-Type': 'application/json' })
)
