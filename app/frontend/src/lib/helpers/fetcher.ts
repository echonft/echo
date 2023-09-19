import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import { isDev } from '@echo/utils/constants/is-dev'
import type { QueryType } from '@echo/utils/types/query-type'
import { setUrlQuery } from '@helpers/request/set-url-query'
import { ErrorStatus } from '@server/constants/error-status'
import type { HTTP_METHOD } from 'next/dist/server/web/http'
import { assoc, assocPath, dissocPath, has, hasPath, is, pathEq, pipe } from 'ramda'

interface FetchResult<T> {
  data: T | undefined
  error:
    | {
        status: ErrorStatus
        message?: string
      }
    | undefined
}

class Fetcher {
  private readonly url: URL
  private init: RequestInit

  constructor(url: URL | string) {
    if (is(String, url)) {
      this.url = new URL(url)
    } else {
      this.url = url
    }
    this.init = {
      headers: {
        'Content-Type': 'application/json',
        method: 'GET'
      }
    }
  }

  authorization(scheme: string, token: string) {
    this.init = assocPath<string, RequestInit>(['headers', 'Authorization'], `${scheme} ${token}`, this.init)
    return this
  }

  bearerToken(token: string) {
    return this.authorization('Bearer', token)
  }

  body<T extends object>(body: T) {
    if (pathEq('GET', ['headers', 'method'], this.init)) {
      throw Error('GET requests cannot have a body')
    }
    const bodyString = JSON.stringify(body)
    this.init = assoc<'body', RequestInit>('body', bodyString, this.init)
    return this
  }

  disableCache() {
    if (hasPath(['next', 'revalidate'], this.init)) {
      throw Error(`Trying to disable cache on a request with revalidate. Only one should be specified`)
    }
    this.init = assoc<'cache', RequestInit>('cache', 'no-store', this.init)
    return this
  }

  async fetch<T>(): Promise<FetchResult<T>> {
    // in dev, always disable cache
    if (isDev) {
      this.forceDisableCache()
    }
    const response = await fetch(this.url, this.init)
    if (response.ok) {
      const data = (await response.json()) as T
      return { data, error: undefined }
    }
    try {
      const errorData = (await response.json()) as ErrorResponse
      return { data: undefined, error: { message: errorData.error, status: response.status } }
    } catch (e) {
      return { data: undefined, error: { status: response.status } }
    }
  }

  async fetchResponse<T>(): Promise<T> {
    // in dev, always disable cache
    if (isDev) {
      this.forceDisableCache()
    }
    const response = await fetch(this.url, this.init)
    return (await response.json()) as T
  }

  method(method: HTTP_METHOD) {
    this.init = assocPath<string, RequestInit>(['headers', 'method'], method, this.init)
    return this
  }

  query<T extends QueryType>(query: T, addArrayBrackets = false) {
    setUrlQuery(this.url, query, addArrayBrackets)
    return this
  }

  revalidate(revalidate: number) {
    if (has('cache', this.init)) {
      throw Error(`Trying to set revalidate on a request with a cache policy. Only one should be specified`)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.init = assocPath<string, RequestInit>(['next', 'revalidate'], revalidate, this.init)
    return this
  }

  tags(tags: string[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.init = assoc<'tags', RequestInit>('tags', tags, this.init)
    return this
  }

  private forceDisableCache() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.init = pipe(dissocPath(['next', 'revalidate']), assoc('cache', 'no-store'))(this.init)
    return this
  }
}

export function fetcher(url: URL | string) {
  return new Fetcher(url)
}
