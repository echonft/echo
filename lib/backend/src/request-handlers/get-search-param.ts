import { ServerError } from '@echo/backend/errors/server-error'
import type { NextRequest } from '@echo/backend/types/next-request'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getSearchParam<T extends Nullable<string>>(
  req: NextRequest<unknown>,
  name: string,
  assert?: boolean
): T {
  const { searchParams } = new URL(req.url)
  const param = searchParams.get(name)
  if (assert) {
    if (isNil(param)) {
      throw new ServerError()
    }
    return param as T
  }
  return param as T
}
