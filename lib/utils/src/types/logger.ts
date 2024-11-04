import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'
import type { Logger as PinoLogger } from 'pino'

export type Logger = PinoLogger

export interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  serializers?: LoggerSerializer | LoggerSerializer[]
}
