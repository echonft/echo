import { hostname } from '@echo/routing/constants/hostname'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'

export function baseUrl() {
  const nodeEnv = nodeEnvironment()
  const scheme = nodeEnv == NodeEnvironment.Development ? 'http://' : 'https://'
  return `${scheme}${hostname()}`
}
