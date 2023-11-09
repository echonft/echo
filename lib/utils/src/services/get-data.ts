import { setUrlQuery } from '@echo/utils/helpers/set-url-query'
import { getHeaders } from '@echo/utils/services/get-headers'
import type { QueryType } from '@echo/utils/types/query-type'
import { always, applySpec, isNotNil } from 'ramda'

export async function getData<T extends QueryType | undefined, U>(
  url: URL,
  query?: T,
  token?: string,
  addArrayBrackets = false
): Promise<U> {
  const init = applySpec<RequestInit>({
    method: always('GET'),
    headers: getHeaders
  })(token)
  if (isNotNil(query)) {
    setUrlQuery(url, query, addArrayBrackets)
  }
  const response = await fetch(url, init)
  return (await response.json()) as U
}
