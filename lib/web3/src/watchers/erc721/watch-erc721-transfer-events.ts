import type { ChainName } from '@echo/utils/types/chain-name'
import type { Erc721Abi } from '@echo/web3/types/erc721-abi-type'
import type { WatchEventArgs } from '@echo/web3/types/watch-event-args'
import { watchEvent } from '@echo/web3/watchers/watch-event'
import type { ExtractAbiEvent } from 'abitype'
import { assoc, pipe } from 'ramda'
import { erc721Abi, type Log, type WatchContractEventReturnType } from 'viem'

export function watchErc721TransferEvents<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<Erc721Abi, 'Transfer'>>,
  TChain extends ChainName
>(args: Omit<WatchEventArgs<TLog, TChain, Erc721Abi, 'Transfer'>, 'abi' | 'eventName'>) {
  return pipe<
    [Omit<WatchEventArgs<TLog, TChain, Erc721Abi, 'Transfer'>, 'abi' | 'eventName'>],
    Omit<WatchEventArgs<TLog, TChain, Erc721Abi, 'Transfer'>, 'eventName'>,
    WatchEventArgs<TLog, TChain, Erc721Abi, 'Transfer'>,
    WatchContractEventReturnType
  >(
    assoc('abi', erc721Abi),
    assoc('eventName', 'Transfer'),
    watchEvent<TLog, TChain, Erc721Abi, 'Transfer'>
  )(args)
}
