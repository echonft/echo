import type { Cluster } from '@metaplex-foundation/umi'

export function getClusterRpcUrl(cluster: Cluster): { http: string; ws?: string } {
  switch (cluster) {
    case 'devnet':
      return {
        http: `https://solana-devnet.rpc.extrnode.com/${process.env.EXTR_NODE_API_KEY}`,
        ws: `wss://solana-devnet.rpc.extrnode.com/${process.env.EXTR_NODE_API_KEY}`
      }
    case 'localnet':
      return {
        http: 'http://localhost:8899'
      }
    case 'mainnet-beta':
      return {
        http: `https://solana-mainnet.rpc.extrnode.com/${process.env.EXTR_NODE_API_KEY}`,
        ws: `wss://solana-mainnet.rpc.extrnode.com/${process.env.EXTR_NODE_API_KEY}`
      }
    default:
      throw Error(`cluster ${cluster} not supported`)
  }
}
