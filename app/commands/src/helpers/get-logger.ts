import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Logger } from '@echo/utils/types/logger'

export function getLogger(): Logger {
  return getBaseLogger('Commands', { serializers: modelLoggerSerializers })
}
