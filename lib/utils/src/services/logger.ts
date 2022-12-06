import { isDebug } from '../constants'
import { BaseLogger, pino } from 'pino'
import { isNil } from 'rambda'

class Logger {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected _instance: BaseLogger

  public getInstance(): BaseLogger {
    if (isNil(this._instance)) {
      this._instance = pino({
        level: isDebug ? 'debug' : 'info'
      })
    }
    return this._instance
  }
}

export const logger: BaseLogger = new Logger().getInstance()
