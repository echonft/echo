import { isNil } from 'ramda'

export function getAxiosConfig(token?: string) {
  return isNil(token)
    ? {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    : {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
}
