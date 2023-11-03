import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { setUrlQuery } from '@echo/utils/helpers/set-url-query'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { FetchApiError } from '@echo/utils/types/fetch-api-error'
import { type QueryType } from '@echo/utils/types/query-type'
import { assoc, assocPath, is, pathEq } from 'ramda'

type HTTP_METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface FetchResult<T> {
  data: T | undefined
  error: Error | undefined
}

export class Fetcher {
  private readonly url: URL
  protected init: RequestInit

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

  bearerToken(token?: string) {
    if (isNilOrEmpty(token)) {
      return this
    }
    return this.authorization('Bearer', token)
  }

  body<T extends object>(body?: T) {
    if (isNilOrEmpty(body)) {
      return this
    }
    if (pathEq('GET', ['headers', 'method'], this.init)) {
      throw Error('GET requests cannot have a body')
    }
    const bodyString = JSON.stringify(body)
    this.init = assoc<'body', RequestInit>('body', bodyString, this.init)
    return this
  }

  async fetch<T>(): Promise<FetchResult<T>> {
    const response = await fetch(this.url, this.init)
    if (response.ok) {
      try {
        const data = (await response.json()) as T
        return { data, error: undefined }
      } catch (e) {
        return { data: undefined, error: e as Error }
      }
    }
    try {
      const errorResponse = (await response.json()) as ErrorResponse
      return { data: undefined, error: new FetchApiError(errorResponse.error, response.status) }
    } catch (e) {
      return { data: undefined, error: new FetchApiError(errorMessage(e), response.status) }
    }
  }

  async fetchResponse<T>(): Promise<T> {
    const response = await fetch(this.url, this.init)
    return (await response.json()) as T
  }

  method(method: HTTP_METHODS) {
    this.init = assocPath<string, RequestInit>(['headers', 'method'], method, this.init)
    return this
  }

  query<T extends QueryType>(query?: T, addArrayBrackets = false) {
    if (isNilOrEmpty(query)) {
      return this
    }
    setUrlQuery(this.url, query, addArrayBrackets)
    return this
  }
}

export function fetcher(url: URL | string) {
  return new Fetcher(url)
}
