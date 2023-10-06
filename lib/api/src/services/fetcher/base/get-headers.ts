import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { assoc } from 'ramda'

export function getHeaders(token?: string): HeadersInit {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (isNilOrEmpty(token)) {
    return headers
  }
  return assoc('Authorization', `Bearer ${token}`, headers)
}
