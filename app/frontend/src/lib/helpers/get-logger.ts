import { getBaseLogger } from '@echo/utils/services/logger'
import type { Logger } from '@echo/utils/types/logger'

export function getLogger(): Logger {
  return getBaseLogger('frontend')
}
