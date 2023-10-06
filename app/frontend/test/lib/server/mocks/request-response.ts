import type { ApiRequest } from '@echo/api/types/api-request'
import { setUrlQuery } from '@echo/utils/helpers/set-url-query'
import type { QueryType } from '@echo/utils/types/query-type'
import { NextRequest } from 'next/server'
import { isNil } from 'ramda'

export function mockRequest<T = undefined, Q = undefined>(body?: T, query?: Q) {
  const url = new URL('https://echo.xyz/')

  if (!isNil(query)) {
    setUrlQuery(url, query as QueryType)
  }

  if (isNil(body)) {
    return new NextRequest(url) as ApiRequest<T>
  }

  return new NextRequest(url, {
    body: JSON.stringify(body),
    method: 'POST'
  }) as ApiRequest<T>
}
