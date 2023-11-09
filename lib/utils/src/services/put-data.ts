import { getBody } from '@echo/utils/services/get-body'
import { getHeaders } from '@echo/utils/services/get-headers'
import { always, applySpec, pipe, prop } from 'ramda'

export async function putData<T extends object, U>(url: URL, body?: T, token?: string): Promise<U> {
  const init = applySpec<RequestInit>({
    method: always('PUT'),
    headers: pipe(prop('token'), getHeaders),
    body: pipe<[{ body: T | undefined; token: string | undefined }], T | undefined, BodyInit | null>(
      prop('body'),
      getBody
    )
  })({ body, token })
  const response = await fetch(url, init)
  return (await response.json()) as U
}
