import { compile, pathToRegexp } from 'path-to-regexp'

export interface PathArgs {
  path: string
  secure?: boolean
}

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

  test(string: string) {
    return pathToRegexp(this.path).test(string)
  }
}
