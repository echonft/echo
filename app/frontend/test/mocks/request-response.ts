import { setUrlQuery } from '../../src/lib/helpers/request/set-url-query'
import { ApiRequest } from '@echo/api'
import { QueryType } from '@echo/utils'
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
