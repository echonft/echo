import { whenNil } from '@echo/utils/fp/when-nil'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { getSupportedChains } from '@echo/utils/helpers/get-supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { always, head, type NonEmptyArray, pipe } from 'ramda'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain(chain?: ChainName): Promise<void> {
  const defaultChain = pipe<[], NonEmptyArray<ChainName>, ChainName>(getSupportedChains, head)()
  try {
    const chainId = pipe(whenNil(always(defaultChain)), getChainId)(chain)
    await wagmiSwitchChain(wagmiConfig, { chainId })
  } catch (err) {
    return
  }
}
