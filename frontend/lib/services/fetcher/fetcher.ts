import { Routes } from '@echo/discord/routing/routes'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { isEmpty, isNil } from 'ramda'

export const fetcher = <Response, Data extends Record<string, unknown> | undefined = undefined>(
  url: Routes,
  data?: Data,
  overrideInit?: RequestInit
): Promise<Response> => {
  if (isNil(data) || isEmpty(data)) {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...overrideInit
    }).then((res) => {
      if (!res.ok) {
        throw new HTTPError(url, res, res.status)
      }
      return res.json()
    })
  } else {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      ...overrideInit
    }).then((res) => {
      if (!res.ok) {
        throw new HTTPError(url, res, res.status)
      }
      return res.json()
    })
  }
}
