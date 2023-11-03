import { fetcher } from '@echo/api/services/fetcher/base/fetcher'

export async function getData<T>(url: URL, token?: string): Promise<T> {
  return await fetcher(url).bearerToken(token).fetchResponse()
}
