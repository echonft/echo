import type { ChainName } from '@echo/utils/types/chain-name'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { EchoAbiEventNames } from '@echo/web3/constants/echo-events/echo-abi-event-names'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import type { ViemClient } from '@echo/web3/types/viem-client'
import type { WatchContractEventOnLogsFn } from 'viem'

export function watchEchoEvents<T extends ChainName>(
  client: ViemClient<T>,
  onLogs: WatchContractEventOnLogsFn<typeof ECHO_ABI, EchoAbiEventNames>,
  onError?: ((error: Error) => void) | undefined
) {
  return client.watchContractEvent({
    address: getEchoAddressByChain(client.name),
    abi: ECHO_ABI,
    onLogs,
    onError
  })
}
