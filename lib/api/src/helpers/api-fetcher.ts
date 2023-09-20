import type { ErrorResponse } from '@echo/api/types/responses/error-response'
import { setUrlQuery } from '@echo/utils/helpers/set-url-query'
import type { QueryType } from '@echo/utils/types/query-type'
import type { HTTP_METHOD } from 'next/dist/server/web/http'
import { assoc, assocPath, is, pathEq } from 'ramda'

export interface ApiFetchResult<T> {
  data: T | undefined
  error: Error | undefined
}

export class ApiFetcher {
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

  async fetch<T>(): Promise<ApiFetchResult<T>> {
    // in dev, always disable cache
    const response = await fetch(this.url, this.init)
    if (response.ok) {
      const data = (await response.json()) as T
      return { data, error: undefined }
    }
    try {
      const errorData = (await response.json()) as ErrorResponse
      return { data: undefined, error: new Error(errorData.error) }
    } catch (e) {
      return { data: undefined, error: e as Error }
    }
  }

  method(method: HTTP_METHOD) {
    this.init = assocPath<string, RequestInit>(['headers', 'method'], method, this.init)
    return this
  }

  query<T extends QueryType>(query: T, addArrayBrackets = false) {
    setUrlQuery(this.url, query, addArrayBrackets)
    return this
  }

  private authorization(scheme: string, token: string) {
    this.init = assocPath<string, RequestInit>(['headers', 'Authorization'], `${scheme} ${token}`, this.init)
    return this
  }
}
