import { voidFn } from '@echo/utils/fp/void-fn'
import type { ChainName } from '@echo/utils/types/chain-name'
import { offerExecutedEvent } from '@echo/web3/constants/echo-events/offer-executed-event'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { forEach, ifElse, isNil, path, pipe } from 'ramda'

export function watchOfferCreatedEvent<T extends ChainName>(
  client: ViemClient<T>,
  onOfferCreated: (offerId: string) => void | Promise<void>
) {
  return client.watchEvent({
    address: getEchoAddressByChain(client.name),
    event: offerExecutedEvent,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onLogs: forEach(pipe(path(['args', 'offerId']), ifElse(isNil, voidFn, onOfferCreated)))
  })
}
