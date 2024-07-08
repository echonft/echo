import type { ApiRequest } from '@echo/api/types/api-request'
import { ServerError } from '@echo/frontend/lib/helpers/error/server-error'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getSearchParam<T extends Nullable<string>>(
  req: ApiRequest<unknown>,
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
