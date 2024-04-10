import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { type DigitalAsset, fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import { type Cluster, publicKey } from '@metaplex-foundation/umi'

interface FetchNftArgs {
  cluster: Cluster
  address: string
}
export function fetchNft({ cluster, address }: FetchNftArgs): Promise<DigitalAsset> {
  return fetchDigitalAsset(createUmiInstance(cluster), publicKey(address))
}
