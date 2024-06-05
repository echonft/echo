import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Awaitable } from '@echo/utils/types/awaitable'
import type { ChainName } from '@echo/utils/types/chain-name'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import type { EchoAbi } from '@echo/web3/types/echo-abi-type'
import type { EchoOfferExecutedEventLog } from '@echo/web3/types/log/echo-offer-executed-event-log'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { offerExecutedEventLogSchema } from '@echo/web3/validators/offer-executed-event-log-schema'
import { always, applySpec, identity, isNil, map, pipe, reject, T } from 'ramda'
import { parseEventLogs, type ParseEventLogsParameters } from 'viem'

interface WatchOfferExecutedEventHandlerArgs<T extends ChainName> {
  log: EchoOfferExecutedEventLog
  chain: T
}

interface WatchOfferExecutedEventsArgs<T extends ChainName> {
  client: ViemClient<T>
  handler: <T extends ChainName>(args: WatchOfferExecutedEventHandlerArgs<T>) => Awaitable<void>
}

export function watchOfferExecutedEvents<T extends ChainName>(args: WatchOfferExecutedEventsArgs<T>) {
  const { client, handler } = args
  return client.watchContractEvent({
    abi: echoAbi,
    eventName: 'OfferExecuted',
    onLogs: pipe(
      applySpec<ParseEventLogsParameters<EchoAbi, 'OfferExecuted', true>>({
        abi: always(echoAbi),
        eventName: always('OfferExecuted'),
        logs: identity,
        strict: T
      }),
      parseEventLogs<EchoAbi, true, 'OfferExecuted'>,
      reject(isNil),
      map(
        pipe(
          (log) => offerExecutedEventLogSchema.parse(log),
          (log) => handler({ log, chain: client.name })
        )
      )
    ),
    onError: (error: Error) => {
      console.error(`error parsing 'OfferExecuted' event log on Echo: ${errorMessage(error)}`)
    }
  })
}
