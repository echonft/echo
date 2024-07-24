import type { ApiRequest } from '@echo/api/types/api-request'
import { NextRequest } from 'next/server'
import { isNil } from 'ramda'

export function mockRequest<T extends object = never>(body?: T) {
  const url = 'https://echo.xyz/'
  if (isNil(body)) {
    return new NextRequest(url) as ApiRequest<T>
  }
  return new NextRequest(url, {
    body: JSON.stringify(body),
    method: 'POST'
  }) as ApiRequest<T>
}
