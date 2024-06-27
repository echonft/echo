import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/logger'
import type { Logger } from '@echo/utils/types/logger'
import pretty from 'pino-pretty'

export function getLogger(name: string): Logger {
  return getBaseLogger(name, { serializers: modelLoggerSerializers, hideNetwork: true }, pretty())
}
