import { allPass, assoc, assocPath, has, ifElse, isNotNil, pipe, prop } from 'ramda'

export const setJsonContentType = ifElse<[RequestInit], RequestInit, RequestInit>(
  allPass([has('headers'), pipe(prop('headers'), isNotNil)]),
  assocPath(['headers', 'Content-Type'], 'application/json'),
  assoc('headers', { 'Content-Type': 'application/json' })
)
