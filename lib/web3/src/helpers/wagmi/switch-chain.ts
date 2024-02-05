import { wagmiConfig } from '@echo/web3/constants/wagmi-config'
import { getChain } from '@echo/web3/helpers/get-chain'
import { switchChain as wagmiSwitchChain } from 'wagmi/actions'

export async function switchChain() {
  await wagmiSwitchChain(wagmiConfig, { chainId: getChain().id })
}
