import { ErrorResponse } from '@echo/api/dist/types'
import { HTTPError } from '@lib/services/fetcher/errors/http'
import { isEmpty, isNil } from 'ramda'

function handleError(path: string, res: Response): void {
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
export const fetcher = <Response, Data = unknown>(
  path: string,
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
