import { ErrorStatus } from '../server/constants/error-status'
import { setUrlQuery } from './request/set-url-query'
import { ErrorResponse } from '@echo/api'
import { QueryType } from '@echo/utils'
import { HTTP_METHOD } from 'next/dist/server/web/http'
import { assoc, assocPath, is, pathEq } from 'ramda'

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

  body<T extends object>(body: T) {
    if (pathEq('GET', ['headers', 'method'], this.init)) {
      throw Error('GET requests cannot have a body')
    }
    const bodyString = JSON.stringify(body)
    this.init = assoc<'body', RequestInit>('body', bodyString, this.init)
    return this
  }

  disableCache() {
    this.init = assoc<'cache', RequestInit>('cache', 'no-store', this.init)
    return this
  }

  async fetch<T>(): Promise<FetchResult<T>> {
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

  fetchResponse<T>(): Promise<T> {
    return fetch(this.url, this.init).then((response) => response.json() as T)
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
}

export function fetcher(url: URL | string) {
  return new Fetcher(url)
}
