import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WatchEventArgs } from '@echo/web3/types/watch-event-args'
import type { Abi, ExtractAbiEvent } from 'abitype'
import type { ContractEventName, Log } from 'viem'

export function watchEvent<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<TAbi, TEventName>>,
  TChain extends ChainName,
  TAbi extends Abi = Abi,
  TEventName extends ContractEventName<TAbi> = ContractEventName<TAbi>
>(args: WatchEventArgs<TLog, TChain, TAbi, TEventName>) {
  const { abi, eventName, client, handler } = args
  return client.watchContractEvent({
    abi,
    eventName,
    onLogs: async (logs: TLog[]) => {
      for (const log of logs) {
        await handler({ log, chain: client.name })
      }
    },
    onError: (error: Error) => {
      pinoLogger.error(`error watching event ${eventName}: ${errorMessage(error)}`)
    }
  })
}
