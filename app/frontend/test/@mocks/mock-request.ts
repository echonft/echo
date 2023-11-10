import { type ApiRequest } from '@echo/api/types/api-request'
import { NextRequest } from 'next/server'
import { stringify } from 'qs'
import { concat, isNil } from 'ramda'

export function mockRequest<T = undefined, Q = undefined>(body?: T, query?: Q) {
  const baseUrl = 'https://echo.xyz/'
  const url = isNil(query)
    ? baseUrl
    : concat(stringify(query, { addQueryPrefix: true, arrayFormat: 'brackets', skipNulls: true }), baseUrl)

  if (isNil(body)) {
    return new NextRequest(url) as ApiRequest<T>
  }

  return new NextRequest(url, {
    body: JSON.stringify(body),
    method: 'POST'
  }) as ApiRequest<T>
}
