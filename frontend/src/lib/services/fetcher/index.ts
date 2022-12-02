import { ErrorResponse } from '@echo/api'
import { Routes } from '@echo/discord'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { isEmpty, isNil } from 'rambda'

function handleError(path: Routes, res: Response): void {
  if (!res.ok) {
    res
      .json()
      .then((error: ErrorResponse) => {
        throw new HTTPError(path, res.status, error.error)
      })
      .catch(() => {
        throw new HTTPError(path, res.status, res.statusText)
      })
  }
}
// TODO Change to result
export const fetcher = <Response, Data extends Record<string, unknown> | undefined = undefined>(
  path: Routes,
  data?: Data,
  overrideInit?: RequestInit
): Promise<Response> => {
  const init = Object.assign(
    {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    overrideInit
  )

  if (isNil(data) || isEmpty(data)) {
    return fetch(path, init).then((res) => {
      handleError(path, res)
      return res.json() as Promise<Response>
    })
  } else {
    return fetch(
      path,
      Object.assign(
        {
          method: 'POST',
          body: JSON.stringify(data)
        },
        init
      )
    ).then((res) => {
      handleError(path, res)
      return res.json() as Promise<Response>
    })
  }
}
