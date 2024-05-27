import { SUPPORTED_CHAINS } from '@echo/utils/constants/chain-names'
import { whenNil } from '@echo/utils/fp/when-nil'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { always, pipe } from 'ramda'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain(chain?: ChainName): Promise<void> {
  const chainId = pipe(whenNil(always(SUPPORTED_CHAINS[0])), getChainId)(chain)
  try {
    await wagmiSwitchChain(wagmiConfig, { chainId })
  } catch (err) {
    return
  }
}
