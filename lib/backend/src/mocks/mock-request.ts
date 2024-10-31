import { NextRequest } from '@echo/backend/types/next-request'
import { isNil } from 'ramda'

export function mockRequest<T extends object = never>(body?: T) {
  const url = 'https://echo.xyz/'
  if (isNil(body)) {
    return new NextRequest<T>(url)
  }
  return new NextRequest<T>(url, {
    body: JSON.stringify(body),
    method: 'POST'
  })
}
