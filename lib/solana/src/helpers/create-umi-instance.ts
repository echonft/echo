import { getClusterRpcUrl } from '@echo/solana/helpers/get-cluster-rpc-url'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { type Cluster, createUmi } from '@metaplex-foundation/umi'
import { web3JsEddsa } from '@metaplex-foundation/umi-eddsa-web3js'
import { defaultProgramRepository } from '@metaplex-foundation/umi-program-repository'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { web3JsTransactionFactory } from '@metaplex-foundation/umi-transaction-factory-web3js'

export function createUmiInstance(cluster: Cluster) {
  const { http, ws } = getClusterRpcUrl(cluster)
  return createUmi()
    .use(web3JsRpc(http, { commitment: 'finalized', wsEndpoint: ws }))
    .use(defaultProgramRepository())
    .use(web3JsEddsa())
    .use(web3JsTransactionFactory())
    .use(mplTokenMetadata())
}
