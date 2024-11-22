import { getBaseLogger } from '@echo/utils/services/logger'

const baseLogger = getBaseLogger('backend')
export function fatal(objOrMsg: object | string, msg?: string): void {
  baseLogger.fatal(objOrMsg, msg)
}

export function error(objOrMsg: object | string, msg?: string): void {
  baseLogger.error(objOrMsg, msg)
}

export function info(objOrMsg: object | string, msg?: string): void {
  baseLogger.info(objOrMsg, msg)
}
