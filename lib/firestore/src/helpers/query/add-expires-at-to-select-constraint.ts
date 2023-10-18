import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { anyPass, complement, concat, has, identity, ifElse, includes, isNil, modify, pipe, prop, unless } from 'ramda'

export function addExpiresAtToSelectConstraint(constraints: QueryConstraints): QueryConstraints {
  return ifElse<[QueryConstraints], QueryConstraints, QueryConstraints>(
    anyPass([isNil, complement(has('select')), pipe(prop('select'), includes('expiresAt'))]),
    identity,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unless(propIsNil('select'), modify<'select', string[], string[]>('select', concat(['expiresAt'])))
  )(constraints)
}
