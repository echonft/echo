import type { ChainName } from '@echo/utils/types/chain-name'
import type { EchoAbi } from '@echo/web3/types/echo-abi-type'
import { watchEchoEvent, type WatchEchoEventArgs } from '@echo/web3/watchers/watch-echo-event'
import type { ExtractAbiEvent } from 'abitype'
import { assoc, pipe } from 'ramda'
import type { Log } from 'viem'

export function watchOfferExecutedEvents<
  TLog extends Log<bigint, number, false, ExtractAbiEvent<EchoAbi, 'OfferExecuted'>>,
  TChain extends ChainName
>(args: Omit<WatchEchoEventArgs<TLog, TChain, 'OfferExecuted'>, 'eventName'>) {
  return pipe(assoc('eventName', 'OfferExecuted'), watchEchoEvent<TLog, TChain, 'OfferExecuted'>)(args)
}
