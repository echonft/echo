import type { ChainName } from '@echo/utils/types/chain-name'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLogger } from '@echo/utils/types/with-logger'

interface GetLoggerArgs extends WithLogger {
  chain: ChainName
}

export function getLogger(args: GetLoggerArgs): Nullable<Logger> {
  const { chain, logger } = args
  return logger?.child({ library: 'opensea', chain })
}
