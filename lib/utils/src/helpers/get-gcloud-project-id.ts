import { environment } from '@echo/utils/constants/environment'

export function getGCloudProjectId() {
  switch (environment) {
    case 'production':
      return 'echo-prod-b71e2'
    case 'staging':
      return ''
    case 'testnet':
      return 'echo-testnet'
    case 'test':
      return 'echo-test-7787f'
    case 'development':
    default:
      return 'echo-dev-fallback'
  }
}
