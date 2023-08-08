import { allPass, always, assoc, assocPath, has, ifElse, isNil, isNotNil, pipe, prop, unless } from 'ramda'

export const setAuthorization = (authorization: string | undefined): ((requestInit: RequestInit) => RequestInit) =>
  unless<RequestInit, RequestInit>(
    always(isNil(authorization)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ifElse(
      allPass([has('headers'), pipe(prop('headers'), isNotNil)]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe<[RequestInit], unknown, RequestInit>(assocPath(['headers', 'Authorization'], authorization)),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe<[RequestInit], unknown, RequestInit>(assoc('headers', { authorization }))
    )
  )
