import { getClusterRpcUrl } from '@echo/solana/helpers/get-cluster-rpc-url'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { type Cluster, createSignerFromKeypair, createUmi, signerIdentity } from '@metaplex-foundation/umi'
import { web3JsEddsa } from '@metaplex-foundation/umi-eddsa-web3js'
import { defaultProgramRepository } from '@metaplex-foundation/umi-program-repository'
import { web3JsRpc } from '@metaplex-foundation/umi-rpc-web3js'
import { web3JsTransactionFactory } from '@metaplex-foundation/umi-transaction-factory-web3js'
import bs58 from 'bs58'

interface CreateUmiInstanceArgs {
  cluster: Cluster
  options?: {
    defaultIdentity?: boolean
  }
}
export function createUmiInstance(args: CreateUmiInstanceArgs) {
  const { cluster, options } = args
  const { http, ws } = getClusterRpcUrl(cluster)

  const umi = createUmi()
    .use(web3JsRpc(http, { commitment: 'finalized', wsEndpoint: ws }))
    .use(defaultProgramRepository())
    .use(web3JsEddsa())
    .use(web3JsTransactionFactory())
    .use(mplTokenMetadata())
  if (options?.defaultIdentity) {
    const payer = createSignerFromKeypair(
      umi,
      umi.eddsa.createKeypairFromSecretKey(bs58.decode(process.env.SOLONA_SIGNER_PRIVATE_KEY))
    )
    return umi.use(signerIdentity(payer))
  }
  return umi
}
