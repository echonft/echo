import { ApiRequest } from '@echo/api'
import { NextRequest } from 'next/server'
import { isNil } from 'ramda'

export function mockRequest<T = undefined>(body?: T) {
  if (isNil(body)) {
    return new NextRequest('https://echo.xyz/') as ApiRequest<T>
  }

  return new NextRequest('https://echo.xyz/', {
    body: JSON.stringify(body),
    method: 'POST'
  }) as ApiRequest<T>
}
