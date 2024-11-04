import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { sei } from 'viem/chains'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain(): Promise<void> {
  await wagmiSwitchChain(wagmiConfig, { chainId: sei.id })
}
