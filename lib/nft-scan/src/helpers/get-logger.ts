import type { ChainName } from '@echo/utils/types/chain-name'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLogger } from '@echo/utils/types/with-logger'

interface GetLoggerArgs extends WithLogger {
  chain: ChainName
  fn: string
}

export function getLogger(args: GetLoggerArgs): Nullable<Logger> {
  const { chain, fn, logger } = args
  return logger?.child({ component: 'nft-scan', chain, fn })
}
