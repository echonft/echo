import { fetcher } from '@echo/utils/services/fetcher'

export async function getData<T>(url: URL, token?: string): Promise<T> {
  return await fetcher(url).bearerToken(token).fetchResponse()
}
