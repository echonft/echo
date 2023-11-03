import { Fetcher } from '@echo/api/services/fetcher/base/fetcher'
import { isDev } from '@echo/utils/constants/is-dev'
import { assoc, assocPath, dissocPath, has, hasPath, pipe } from 'ramda'

export interface FetchResult<T> {
  data: T | undefined
  error: Error | undefined
}

class FrontendFetcher extends Fetcher {
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
    return super.fetch()
  }

  async fetchResponse<T>(): Promise<T> {
    // in dev, always disable cache
    if (isDev) {
      this.forceDisableCache()
    }
    return super.fetchResponse()
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
  return new FrontendFetcher(url)
}
