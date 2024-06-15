import type { Awaitable } from '@echo/utils/types/awaitable'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLogger } from '@echo/utils/types/with-logger'
import type { Erc721Abi } from '@echo/web3/types/erc721-abi-type'
import type { Erc721TransferEventLog } from '@echo/web3/types/log/erc721-transfer-event-log'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { erc721TransferEventLogSchema } from '@echo/web3/validators/erc721-transfer-event-log-schema'
import { always, applySpec, identity, isNil, map, pipe, reject, T } from 'ramda'
import { erc721Abi, parseEventLogs, type ParseEventLogsParameters } from 'viem'

interface WatchErc721TransferEventHandlerArgs<T extends ChainName> extends WithLogger {
  log: Erc721TransferEventLog
  chain: T
}

interface WatchErc721TransferEventsArgs<T extends ChainName> extends WithLogger {
  client: ViemClient<T>
  handler: <T extends ChainName>(args: WatchErc721TransferEventHandlerArgs<T>) => Awaitable<void>
}

export function watchErc721TransferEvents<T extends ChainName>(args: WatchErc721TransferEventsArgs<T>) {
  const { client, handler, logger } = args
  return client.watchContractEvent({
    abi: erc721Abi,
    eventName: 'Transfer',
    onLogs: pipe(
      applySpec<ParseEventLogsParameters<Erc721Abi, 'Transfer', true>>({
        abi: always(erc721Abi),
        eventName: always('Transfer'),
        logs: identity,
        strict: T
      }),
      parseEventLogs<Erc721Abi, true, 'Transfer'>,
      reject(isNil),
      map(
        pipe(
          (log) => erc721TransferEventLogSchema.parse(log),
          (log) => handler({ log, chain: client.name })
        )
      )
    ),
    onError: (err: Error) => {
      logger?.error({ fn: 'watchErc721TransferEvents', err }, "error parsing 'Transfer' event log on ERC721")
    }
  })
}
