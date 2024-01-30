import { Path } from '@echo/api/routing/path'
import type { PathArgs } from '@echo/api/types/routing/path-args'
import { concat, modify } from 'ramda'

export class ApiPath<T extends object> extends Path<T> {
  constructor(args: PathArgs) {
    super(modify('path', concat('/api'), args))
  }
}
