import type { PathArgs } from '@echo/api/types/routing/path-args'
import { getBaseUrl } from '@echo/utils/helpers/get-base-url'
import { getProductionUrl } from '@echo/utils/helpers/get-production-url'
import { compile, pathToRegexp } from 'path-to-regexp'

export class Path<T extends object = never> {
  secure: boolean
  protected path: string

  constructor(args: PathArgs) {
    this.path = args.path
    this.secure = args.secure ?? false
  }

  get(...args: T[]) {
    return compile<T>(this.path, { encode: encodeURIComponent })(...args)
  }

  getUrl(...args: T[]) {
    return `${getBaseUrl()}${this.get(...args)}`
  }

  getProductionUrl(...args: T[]) {
    return `${getProductionUrl()}${this.get(...args)}`
  }

  test(string: string) {
    return pathToRegexp(this.path).test(string)
  }
}
