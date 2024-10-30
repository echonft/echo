import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/logger'
import { error as ffError, info as ffInfo } from 'firebase-functions/logger'

enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50,
  Fatal = 60
}

interface Log extends Record<string, unknown> {
  msg: string
  level: LogLevel
}

const logger = getBaseLogger(
  'firestore-functions',
  { serializers: modelLoggerSerializers, hideNetwork: true },
  {
    write: (msg: string) => {
      const { level, ...rest } = JSON.parse<Log>(msg)
      if (level === LogLevel.Error) {
        ffError(msg, { ...rest })
      } else {
        ffInfo(msg, { ...rest })
      }
    }
  }
)

export function error(objOrMsg: object | string, msg?: string): void {
  logger.error(objOrMsg, msg)
}
