import { setUmiRpcEndpoint } from '@echo/solana/helpers/set-umi-rpc-endpoint'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { type Cluster, createUmi } from '@metaplex-foundation/umi'
import { web3JsEddsa } from '@metaplex-foundation/umi-eddsa-web3js'
import { defaultProgramRepository } from '@metaplex-foundation/umi-program-repository'
import { web3JsTransactionFactory } from '@metaplex-foundation/umi-transaction-factory-web3js'
import { pipe } from 'ramda'

export function createUmiInstance(cluster: Cluster) {
  const umi = pipe(createUmi, setUmiRpcEndpoint(cluster))()
  umi.use(defaultProgramRepository())
  umi.use(web3JsEddsa())
  umi.use(web3JsTransactionFactory())
  umi.use(mplTokenMetadata())
  return umi
}
