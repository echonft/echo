import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'

export interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  hideNetwork?: boolean
  override?: {
    enabled?: boolean
    level?: string
  }
  serializers?: LoggerSerializer | LoggerSerializer[]
}
