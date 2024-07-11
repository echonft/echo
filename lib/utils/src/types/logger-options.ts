import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'

export interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  hideNetwork?: boolean
  serializers?: LoggerSerializer | LoggerSerializer[]
}
