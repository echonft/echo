import type { Nullable } from '@echo/utils/types/nullable'
import type { Logger } from 'pino'

export interface WithLogger {
  logger?: Nullable<Logger>
}

export type WithLoggerType<T> = T & {
  logger?: Nullable<Logger>
}
