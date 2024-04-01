import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import { headers } from 'next/headers'
import { isNil } from 'ramda'

export function assertAdminToken() {
  const headersList = headers()
  const token = process.env.ADMIN_TOKEN
  const authorizationHeader = headersList.get('Authorization')
  if (isNil(authorizationHeader) || authorizationHeader !== `Bearer ${token}`) {
    throw new UnauthorizedError()
  }
}
