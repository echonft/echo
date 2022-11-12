import { Routes } from '@echo/discord/routing/routes'
import { HTTPError } from '@lib/errors/http'
import { isNil } from 'ramda'

export const fetcher = <Response>(url: Routes, data?: any, overrideInit?: RequestInit): Promise<Response> => {
  if (isNil(data)) {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...overrideInit,
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
        'Content-Type': 'application/json',
      },
      ...overrideInit,
    }).then((res) => {
      if (!res.ok) {
        throw new HTTPError(url, res, res.status)
      }
      return res.json()
    })
  }
}
