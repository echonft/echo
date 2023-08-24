import { assocPath, identity, isNil } from 'ramda'

export const setAuthorization = (authorization: string | undefined) =>
  isNil(authorization)
    ? identity<RequestInit>
    : assocPath<string, RequestInit>(['headers', 'Authorization'], authorization)
