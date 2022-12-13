import pino from 'pino'
import { isNil } from 'rambda'
import { isDebug } from '../constants'

class Logger {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  protected _instance: pino.BaseLogger

  public getInstance(): pino.BaseLogger {
    if (isNil(this._instance)) {
      this._instance = pino({
        level: isDebug ? 'debug' : 'info'
      })
    }
    return this._instance
  }
}

export const logger: pino.BaseLogger = new Logger().getInstance()
