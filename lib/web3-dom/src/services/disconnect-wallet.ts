import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { disconnect } from 'wagmi/actions'

export async function disconnectWallet() {
  await disconnect(wagmiConfig)
}
