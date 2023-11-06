import { assertQueryConsraints } from '@echo/firestore/helpers/crud/assert-query-consraints'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { errorMessage } from '@echo/utils/helpers/error-message'

export function guarded_assertQueryConsraints(constraints: QueryConstraints | undefined) {
  try {
    return assertQueryConsraints(constraints)
  } catch (e) {
    throw new BadRequestError(errorMessage(e))
  }
}
