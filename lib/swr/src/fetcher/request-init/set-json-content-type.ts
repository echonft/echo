import { assoc, assocPath, has, ifElse } from 'ramda'

export const setJsonContentType = (requestInit: RequestInit): RequestInit =>
  ifElse<[RequestInit], RequestInit, RequestInit>(
    has('headers'),
    assocPath(['headers', 'Content-Type'], 'application/json'),
    assoc('headers', { 'Content-Type': 'application/json' })
  )(requestInit)
