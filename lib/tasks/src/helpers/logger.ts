import { getBaseLogger } from '@echo/utils/services/logger'
import pretty from 'pino-pretty'

const baseLogger = getBaseLogger('tasks', undefined, pretty())
export function fatal(objOrMsg: object | string, msg?: string): void {
  baseLogger.fatal(objOrMsg, msg)
}

export function error(objOrMsg: object | string, msg?: string): void {
  baseLogger.error(objOrMsg, msg)
}

export function warn(objOrMsg: object | string, msg?: string): void {
  baseLogger.warn(objOrMsg, msg)
}

export function info(objOrMsg: object | string, msg?: string): void {
  baseLogger.info(objOrMsg, msg)
}
