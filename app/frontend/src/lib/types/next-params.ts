import type { WithLoggerType } from '@echo/utils/types/with-logger'

export interface NextParams<T = never> {
  params: WithLoggerType<T>
}
