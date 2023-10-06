import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function assertToken(token: string | undefined): asserts token is string {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
}
