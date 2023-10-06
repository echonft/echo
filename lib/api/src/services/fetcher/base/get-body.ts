import { isNil } from 'ramda'

export function getBody<T extends object>(body: T | undefined | null): BodyInit | null {
  if (isNil(body)) {
    return null
  }
  return JSON.stringify(body)
}
