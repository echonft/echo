import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams } from '@echo/routing/types/route'

export class DiscordApiRoute<TParams extends RouteParams = never> extends Route<TParams, never, never> {
  constructor(path: Path) {
    super(path, 'https://discord.com/api/v10')
  }
}
