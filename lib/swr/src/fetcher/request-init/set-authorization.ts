import { assoc, assocPath, has, ifElse } from 'ramda'

export const setAuthorization =
  (authorization: string) =>
  (requestInit: RequestInit): RequestInit =>
    ifElse<[RequestInit], RequestInit, RequestInit>(
      has('headers'),
      assocPath(['headers', 'authorization'], authorization),
      assoc('headers', { authorization })
    )(requestInit)
