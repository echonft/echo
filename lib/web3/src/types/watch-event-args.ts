import type { ChainName } from '@echo/utils/types/chain-name'
import type { ViemClient } from '@echo/web3/types/viem-client'
import type { Abi, ExtractAbiEvent } from 'abitype'
import type { ContractEventName, Log } from 'viem'

export interface WatchEventArgs<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<TAbi, TEventName>>,
  TChain extends ChainName,
  TAbi extends Abi = Abi,
  TEventName extends ContractEventName<TAbi> = ContractEventName<TAbi>
> {
  abi: TAbi
  eventName: TEventName
  handler: (args: { log: TLog; chain: ChainName }) => void | Promise<void>
  client: ViemClient<TChain>
}
