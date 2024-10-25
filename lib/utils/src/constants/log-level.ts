import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace'
}

export const logLevel: Nullable<LogLevel> = isNil(process.env.LOG_LEVEL)
  ? undefined
  : (process.env.LOG_LEVEL as LogLevel)
