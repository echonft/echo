import type { LoggerSerializer } from '@echo/utils/types/logger-serializer'

export interface LoggerOptions {
  baseMergeObject?: Record<string, unknown>
  serializers?: LoggerSerializer | LoggerSerializer[]
  override?: {
    enabled?: boolean
    level?: string
  }
}
