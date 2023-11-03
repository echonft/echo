import { fetcher } from '@echo/api/services/fetcher/base/fetcher'

export async function postData<T extends object, U>(url: URL, body?: T, token?: string): Promise<U> {
  return await fetcher(url).bearerToken(token).method('POST').body(body).fetchResponse()
}
