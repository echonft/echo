import type { SupportedCluster } from '@echo/helius/types/supported-cluster'

export function getHeliusApiUrl(cluster: SupportedCluster) {
  if (cluster === 'mainnet-beta') {
    return `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  }
  if (cluster === 'devnet') {
    return `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
  }
  return 'http://localhost:8899'
}
