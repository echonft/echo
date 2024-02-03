import { wagmiConfig } from '@echo/web3/constants/wagmi-config'
import { disconnect } from 'wagmi/actions'

export async function disconnectWallet() {
  await disconnect(wagmiConfig)
}
