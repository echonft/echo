import { HTTP_METHOD } from 'next/dist/server/web/http'
import { assoc, assocPath, forEach, forEachObjIndexed, is, isNil, pathEq } from 'ramda'

// FIXME gotta move the api package into frontend to avoid file duplication like this
// (and for other reasons), but for now tests in the frontend don't work
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

  fetch<T>(): Promise<T> {
    return fetch(this.url, this.init).then((response) => response.json() as T)
  }

  method(method: HTTP_METHOD) {
    this.init = assocPath<string, RequestInit>(['headers', 'method'], method, this.init)
    return this
  }

  query<T extends Record<string, string | number | string[] | undefined>>(query: T) {
    forEachObjIndexed<T>((value, key) => {
      const name = key as string
      if (!isNil(value)) {
        if (Array.isArray(value)) {
          forEach((arrayValue: string) => {
            this.url.searchParams.append(`${name}[]`, arrayValue)
          }, value)
        } else {
          this.url.searchParams.set(name, value.toString())
        }
      }
    }, query)
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

  authorization(scheme: string, token: string) {
    this.init = assocPath<string, RequestInit>(['headers', 'Authorization'], `${scheme} ${token}`, this.init)
    return this
  }
}

export function fetcher(url: URL | string) {
  return new Fetcher(url)
}
