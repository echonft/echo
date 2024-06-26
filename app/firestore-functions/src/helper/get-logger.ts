import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getBaseLogger } from '@echo/utils/services/logger'
import type { Logger } from '@echo/utils/types/logger'
import { debug, error, info, warn } from 'firebase-functions/logger'

interface Log extends Record<string, unknown> {
  msg: string
  level: number
}

export function getLogger(): Logger {
  return getBaseLogger(
    'firestore-functions',
    { serializers: modelLoggerSerializers, hideNetwork: true },
    {
      write: (msg: string) => {
        const { level, ...rest } = JSON.parse(msg) as Log
        switch (level) {
          case 10: // trace
          case 20: // debug
            debug(msg, { ...rest })
            break
          case 30: // info
            info(msg, { ...rest })
            break
          case 40: // warn
            warn(msg, { ...rest })
            break
          case 50: // error
          case 60: // fatal
            error(msg, { ...rest })
            break
          default:
            info(msg, { ...rest })
            break
        }
      }
    }
  )
}
