import { getClusterRpcUrl } from '@echo/solana/helpers/get-cluster-rpc-url'
import type { Cluster, Umi } from '@metaplex-foundation/umi'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'

export function setUmiRpcEndpoint(cluster: Cluster) {
  return function (umi: Umi) {
    const { http, ws } = getClusterRpcUrl(cluster)
    return umi.use(web3JsRpc(http, { wsEndpoint: ws }))
  }
}
