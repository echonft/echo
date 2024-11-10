import { productionHostname } from '@echo/routing/constants/production-hostname'
import { baseUrl } from '@echo/routing/helpers/base-url'
import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams, RouteParamsArgs } from '@echo/routing/types/route'
import { concat } from 'ramda'

export class ApiRoute<TParams extends RouteParams = never> extends Route<TParams, never, never> {
  constructor(path: Path) {
    super(concat('/api', path), baseUrl())
  }

  getProductionUrl(...params: RouteParamsArgs<TParams>): string {
    return `https://${productionHostname()}${this.get(...params)}`
  }
}
