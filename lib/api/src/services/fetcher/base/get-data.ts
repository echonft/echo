import { getHeaders } from '@echo/api/services/fetcher/base/get-headers'
import { always, applySpec } from 'ramda'

export async function getData<T>(url: URL, token?: string): Promise<T> {
  const init = applySpec<RequestInit>({
    method: always('GET'),
    headers: getHeaders
  })(token)
  const response = await fetch(url, init)
  return (await response.json()) as T
}
