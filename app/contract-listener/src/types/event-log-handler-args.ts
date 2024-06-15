import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLogger } from '@echo/utils/types/with-logger'

export interface EventLogHandlerArgs<T> extends WithLogger {
  log: T
  chain: ChainName
}
