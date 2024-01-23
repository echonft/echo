import type { RequestParams } from '@echo/frontend/lib/types/request/request-params'
import { parse } from 'qs'
import { assoc, modify } from 'ramda'
import type { ParseParams } from 'zod'

interface Schema {
  parse: (data: unknown, params?: Partial<ParseParams> | undefined) => unknown
}

export function addParamFromRequest<T extends Schema>(param: string, schema: T, isArray?: boolean) {
  return function <U extends object>(requestParams: RequestParams<U>) {
    const { request } = requestParams
    const { searchParams } = new URL(request.url)
    parse(request.url)
    if (searchParams.has(param)) {
      const searchParam = schema.parse(isArray ? searchParams.getAll(param) : searchParams.get(param))
      return modify<'params', U, U>('params', assoc(param, searchParam))(requestParams) as RequestParams<U>
    }
    return requestParams
  }
}
