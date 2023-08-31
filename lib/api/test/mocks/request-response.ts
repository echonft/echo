/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiRequest } from '@echo/api-public'
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
