import { environment } from '@echo/utils/constants/environment'
import { isTest } from '@echo/utils/constants/is-test'

export function getGCloudProjectId() {
  // when NODE_ENV is "test", it takes precedence over ENV
  if (isTest) {
    return 'echo-test-7787f'
  }
  switch (environment) {
    case 'test':
      throw Error('test ENV should never be used outside of tests')
    case 'production':
      return 'echo-prod-b71e2'
    case 'staging':
      return 'echo-staging-ba121'
    case 'testnet':
      return 'echo-testnet'
    case 'development':
    default:
      return 'echo-dev-fallback'
  }
}
