import { castAs } from '../../../fp/cast-as'
import { allPass, always, assoc, assocPath, complement, has, ifElse, isNil, pipe, prop, unless } from 'ramda'

export const setAuthorization = (authorization: string | undefined) =>
  unless<RequestInit, RequestInit>(
    always(isNil(authorization)),
    ifElse(
      allPass([has('headers'), pipe(prop('headers'), complement(isNil))]),
      pipe<[RequestInit], unknown, RequestInit>(
        assocPath(['headers', 'Authorization'], authorization),
        castAs<RequestInit>
      ),
      pipe<[RequestInit], unknown, RequestInit>(assoc('headers', { authorization }), castAs<RequestInit>)
    )
  )
