import type { TokenArgs } from '@echo/api/types/token-args'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

export function assertToken<T extends TokenArgs>(
  args: T
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): asserts args is Omit<T, 'token'> & Record<'token', string> {
  if (propIsNil('token', args)) {
    throw Error('not logged in')
  }
}
