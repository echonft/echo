import type { ChainName } from '@echo/utils/types/chain-name'

export interface EventLogHandlerArgs<T> {
  log: T
  chain: ChainName
}
