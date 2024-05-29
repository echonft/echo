import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { EchoAbi } from '@echo/web3/types/echo-abi-type'
import type { WatchEventArgs } from '@echo/web3/types/watch-event-args'
import type { ExtractAbiEvent } from 'abitype'
import type { ContractEventName, Log } from 'viem'

export type WatchEchoEventArgs<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<EchoAbi, TEventName>>,
  TChain extends ChainName,
  TEventName extends ContractEventName<EchoAbi> = ContractEventName<EchoAbi>
> = Omit<WatchEventArgs<TLog, TChain, EchoAbi, TEventName>, 'abi'>

export function watchEchoEvent<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<EchoAbi, TEventName>>,
  TChain extends ChainName,
  TEventName extends ContractEventName<EchoAbi> = ContractEventName<EchoAbi>
>(args: WatchEchoEventArgs<TLog, TChain, TEventName>) {
  const { eventName, client, handler } = args
  return client.watchContractEvent({
    abi: ECHO_ABI,
    eventName,
    onLogs: async (logs: TLog[]) => {
      for (const log of logs) {
        await handler({ log, chain: client.name })
      }
    },
    onError: (error: Error) => {
      pinoLogger.error(`error watching event ${eventName} on Echo: ${errorMessage(error)}`)
    }
  })
}
