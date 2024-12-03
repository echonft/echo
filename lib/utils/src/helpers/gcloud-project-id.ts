import { Environment, environment } from '@echo/utils/constants/environment'

export function gcloudProjectId() {
  switch (environment()) {
    case Environment.Production:
      return 'echo-prod-b71e2'
    case Environment.Development:
      return 'echo-dev-fallback'
  }
}
