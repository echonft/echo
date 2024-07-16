import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import { values } from 'ramda'

export function isApiWebhookPath(path: string): boolean {
  const webhookPaths = values(apiPathProvider.webhook)
  for (const webhookPath of webhookPaths) {
    if (webhookPath.test(path)) {
      return true
    }
  }
  return false
}
