import { getBody } from '@echo/api/services/fetcher/base/get-body'
import { getHeaders } from '@echo/api/services/fetcher/base/get-headers'
import { always, applySpec, pipe, prop } from 'ramda'

export async function postData<T extends object, U>(url: URL, body?: T, token?: string): Promise<U> {
  const init = applySpec<RequestInit>({
    method: always('POST'),
    headers: pipe(prop('token'), getHeaders),
    body: pipe<[{ body: T | undefined; token: string | undefined }], T | undefined, BodyInit | null>(
      prop('body'),
      getBody
    )
  })({ body, token })
  const response = await fetch(url, init)
  return (await response.json()) as U
}
