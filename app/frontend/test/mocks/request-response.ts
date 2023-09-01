import { setUrlQuery } from '../../src/lib/helpers/set-url-query'
import { ApiRequest } from '@echo/api'
import { NextRequest } from 'next/server'
import { isNil } from 'ramda'

export function mockRequest<T = undefined, Q = undefined>(body?: T, query?: Q) {
  const url = new URL('https://echo.xyz/')

  if (!isNil(query)) {
    setUrlQuery(url, query as Record<string, string | number | string[] | undefined>)
  }

  if (isNil(body)) {
    return new NextRequest(url) as ApiRequest<T>
  }

  return new NextRequest(url, {
    body: JSON.stringify(body),
    method: 'POST'
  }) as ApiRequest<T>
}
