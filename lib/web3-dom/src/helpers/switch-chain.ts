import { getChain } from '@echo/web3/helpers/get-chain'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain() {
  await wagmiSwitchChain(wagmiConfig, { chainId: getChain().id })
}
