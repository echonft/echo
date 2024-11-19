import { Environment, environment } from '@echo/utils/constants/environment'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'

export function gcloudProjectId() {
  // when NODE_ENV is "test", it takes precedence over ENV
  if (nodeEnvironment() === NodeEnvironment.Test) {
    return 'echo-test-7787f'
  }
  switch (environment()) {
    case Environment.Test:
      return 'echo-test-7787f'
    case Environment.Production:
      return 'echo-prod-b71e2'
    case Environment.Staging:
      return 'echo-staging-ba121'
    case Environment.Development:
      return 'echo-dev-fallback'
  }
}
