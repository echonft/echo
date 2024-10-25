import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import { supportedChains } from '@echo/model/helpers/chain/supported-chains'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { always, converge, defaultTo, head, type NonEmptyArray, objOf, pipe } from 'ramda'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain(chain?: Chain): Promise<void> {
  const defaultChain = pipe<[], NonEmptyArray<Chain>, Chain>(supportedChains, head)()
  try {
    await converge(wagmiSwitchChain, [always(wagmiConfig), pipe(defaultTo(defaultChain), chainId, objOf('chainId'))])(
      chain
    )
  } catch (_err) {
    return
  }
}
