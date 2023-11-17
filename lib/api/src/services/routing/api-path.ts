import type { PathArgs } from '@echo/api/services/routing/path'
import { Path } from '@echo/api/services/routing/path'
import { concat, modify } from 'ramda'

export class ApiPath<T extends object> extends Path<T> {
  constructor(args: PathArgs) {
    super(modify('path', concat('/api'), args))
  }
}
