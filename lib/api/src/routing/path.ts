import type { PathArgs } from '@echo/api/types/routing/path-args'
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
    return `${process.env.NEXT_PUBLIC_URL}${this.get(...args)}`
  }

  test(string: string) {
    return pathToRegexp(this.path).test(string)
  }
}
