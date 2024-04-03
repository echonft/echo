import { isDev } from '@echo/utils/constants/is-dev'

export function getSolanaRpcEndoint() {
  if (isDev) {
    return `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  }
  return ` https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
}
