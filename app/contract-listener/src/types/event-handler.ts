import type { ChainName } from '@echo/utils/types/chain-name'

export interface EventHandler<T> {
  log: T
  chain: ChainName
}
