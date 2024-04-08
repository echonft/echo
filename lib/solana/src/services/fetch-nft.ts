import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { type DigitalAsset, fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import { type Cluster, publicKey, type Umi } from '@metaplex-foundation/umi'
import { isNil } from 'ramda'

interface FetchNftArgs {
  umi?: Umi
  cluster?: Cluster
  address: string
}
function getUmi(cluster?: Cluster) {
  if (isNil(cluster)) {
    throw Error('cluster needs to be defined when umi is not passed')
  }
  return createUmiInstance({ cluster })
}
export function fetchNft({ umi, cluster, address }: FetchNftArgs): Promise<DigitalAsset> {
  const context = umi ?? getUmi(cluster)
  return fetchDigitalAsset(context, publicKey(address))
}
