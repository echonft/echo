import type { ChainName } from '@echo/utils/types/chain-name'
import { ERC721_ABI } from '@echo/web3/constants/erc721-abi'
import type { ViemClient } from '@echo/web3/types/viem-client'
import type { WatchContractEventOnLogsFn } from 'viem'

export function watchErc721TransferEvents<T extends ChainName>(
  client: ViemClient<T>,
  onLogs: WatchContractEventOnLogsFn<typeof ERC721_ABI, 'Transfer'>,
  onError?: ((error: Error) => void) | undefined
) {
  return client.watchContractEvent({
    abi: ERC721_ABI,
    eventName: 'Transfer',
    onLogs: onLogs,
    onError
  })
}
