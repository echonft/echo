import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/logger'
import type { Logger } from '@echo/utils/types/logger'
import type { LoggerOptions } from '@echo/utils/types/logger-options'
import { isNil, mergeDeepLeft } from 'ramda'

export function getLogger(options?: Omit<LoggerOptions, 'serializers'>): Logger {
  const baseOptions: LoggerOptions = { serializers: modelLoggerSerializers }
  return getBaseLogger(
    'Commands',
    isNil(options) ? baseOptions : (mergeDeepLeft(baseOptions, options) as LoggerOptions)
  )
}
